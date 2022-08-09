import Debug from '../Debug';
import Node from '../Nodes/Node';
import NodeEvalContext from '../Nodes/NodeEvalContext';
import NodeSocketRef from '../Nodes/NodeSocketRef';
import Socket from '../Sockets/Socket';
import Graph from './Graph';

// eslint-disable-next-line no-promise-executor-return
const sleep = (duration:number) => new Promise((resolve) => setTimeout(resolve, Math.round(duration * 1000)));

export default class GraphEvaluator {
  // tracking the next node+input socket to execute.
  public flowWorkQueue: NodeSocketRef[] = [];
  public asyncNodes: Node[] = [];

  constructor(public graph: Graph, public verbose = false) {
  }

  // maybe this should have an id?
  // IMPORTANT: should events somehow register themselves at graph initialization?  There is a missing step here.
  // This simplistic approach is okay if events do no have filters themselves.
  triggerEvents(nodeName: string, outputValues: Map<string, any> = new Map<string, any>()): number {
    // look up any nodes with this trigger name and add them to the executionQueue
    const nodes = Object.values(this.graph.nodes).filter((node) => (node.typeName === nodeName));

    nodes.forEach((node) => {
      // apply output values
      outputValues.forEach((value, name) => {
        // eslint-disable-next-line no-param-reassign
        node.getOutputSocket(name).value = value;
      });

      let flowOutputCount = 0;
      node.outputSockets.forEach((outputSocket) => {
        // console.log(outputSocket);
        if (outputSocket.valueTypeName === 'flow') {
          if (outputSocket.links.length === 1) {
            this.flowWorkQueue.push(outputSocket.links[0]);
            flowOutputCount++;
          }
          if (outputSocket.links.length > 1) {
            throw new Error(`flow output ${node.typeName}.${outputSocket.name} has more than 1 downstream link, ${outputSocket.links.length}`);
          }
        }
      });
      if (flowOutputCount === 0) {
        throw new Error(`no flow outputs for trigger event ${nodeName}`);
      }
    });

    // inform how many trigger nodes were triggered
    return nodes.length;
  }

  // NOTE: This is a simplistic recursive and wasteful approach.
  // Is is optimal for a tree, but can do a lot of duplicate evaluates in dense graphs.
  // It will also get stuck in a recursive loop when there are loops in the graph.
  // TODO: Replace with initial traversal to extract sub DAG, order it, and evaluate each node once.
  resolveInputValueFromSocket(inputSocket: Socket): any {
    if (inputSocket.valueTypeName === 'flow') {
      throw new Error(`can not resolve input values for Eval input sockets: ${inputSocket.name}`);
    }

    // if it has no links, return the immediate value
    if (inputSocket.links.length === 0) {
      return inputSocket.value;
    }
    if (inputSocket.links.length > 1) {
      throw new Error(`input socket has too many links: ${inputSocket.name} has ${inputSocket.links.length} links`);
    }

    // what is inputSocket connected to?
    const upstreamOutputSocket = this.graph.getOutputSocket(inputSocket.links[0]);

    // if upstream node is an eval, we just return its last value.
    const upstreamNode = this.graph.nodes[inputSocket.links[0].nodeId];
    if (upstreamNode.isEvalNode) {
      // eslint-disable-next-line no-param-reassign
      inputSocket.value = upstreamOutputSocket.value;
      return upstreamOutputSocket.value;
    }

    // resolve all inputs for the upstream node (this is where the recursion happens)
    // TODO: This is a bit dangerous as if there are loops in the graph, this will blow up the stack
    upstreamNode.inputSockets.forEach((upstreamInputSocket) => {
      // eslint-disable-next-line no-param-reassign
      this.resolveInputValueFromSocket(upstreamInputSocket);
    });

    Debug.logVerbose(`GraphEvaluator: evaluating immediate node ${upstreamNode.typeName}`);

    const context = new NodeEvalContext(this, upstreamNode);
    context.evalImmediate();

    // get the output value we wanted.
    // eslint-disable-next-line no-param-reassign
    inputSocket.value = upstreamOutputSocket.value;

    return inputSocket.value;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
  commit(outputFlowSocket: NodeSocketRef, onDownstreamCompleted: (()=> void) | undefined = undefined) {
    const node = this.graph.nodes[outputFlowSocket.nodeId];
    const outputSocket = node.getOutputSocket(outputFlowSocket.socketName);

    Debug.logVerbose(`GraphEvaluator: commit: ${node.typeName}.${outputSocket.name}`);

    if (outputSocket.links.length > 1) {
      throw new Error('invalid for an output flow socket to have multiple downstream links:'
      + `${node.typeName}.${outputSocket.name} has ${outputSocket.links.length} downlinks`);
    }
    if (outputSocket.links.length === 1) {
      Debug.logVerbose(`GraphEvaluator: scheduling next flow node: ${outputSocket.links[0].nodeId}.${outputSocket.links[0].socketName}`);

      this.flowWorkQueue.push(outputSocket.links[0]);
    }
  }

  // returns the number of new execution steps created as a result of this one step
  executeStep(): boolean {
    // pop the next node off the queue
    const nodeSocketRef = this.flowWorkQueue.shift();
    // no work waiting!
    if (nodeSocketRef === undefined) {
      return false;
    }

    const node = this.graph.nodes[nodeSocketRef.nodeId];
    Debug.logVerbose(`evaluating node: ${node.typeName}`);

    // first resolve all input values
    // flow socket is set to true for the one flowing in, while all others are set to false.
    node.inputSockets.forEach((inputSocket) => {
      if (inputSocket.valueTypeName !== 'flow') {
        // eslint-disable-next-line no-param-reassign
        this.resolveInputValueFromSocket(inputSocket);
      } else {
        // eslint-disable-next-line no-param-reassign
        inputSocket.value = (inputSocket.name === nodeSocketRef.socketName);
      }
    });

    Debug.logVerbose(`GraphEvaluator: evaluating flow node ${node.typeName}`);

    const context = new NodeEvalContext(this, node);
    context.evalFlow();

    // Auto-commit if no existing commits and no promises waiting.
    if (context.numCommits === 0 && !context.async) {
      // ensure this is auto-commit compatible.
      let numFlowOutputs = 0;
      node.outputSockets.forEach((outputSocket) => {
        if (outputSocket.valueTypeName === 'flow') {
          numFlowOutputs++;
        }
      });

      if (numFlowOutputs !== 1) {
        throw new Error(`can not use auto-commit if there are multiple flow outputs, number of outputs is ${numFlowOutputs} on ${node.typeName}`);
      }

      node.outputSockets.forEach((outputSocket) => {
        if (outputSocket.valueTypeName === 'flow') {
          this.commit(new NodeSocketRef(nodeSocketRef.nodeId, outputSocket.name));
        }
      });
    }

    return true;
  }

  // NOTE: This does not execute all if there are promises.
  executeAll(stepLimit: number = 100000000): number {
    let stepsExecuted = 0;
    while ((stepsExecuted < stepLimit) && this.executeStep()) {
      stepsExecuted++;
    }
    return stepsExecuted;
  }

  async executeAllAsync(timeLimit = 100, stepLimit: number = 100000000): Promise<number> {
    let stepsExecuted = 0;
    let timeUsed = 0;
    do {
      // eslint-disable-next-line no-await-in-loop
      await sleep(0.5);
      stepsExecuted += this.executeAll(stepLimit);
      timeUsed += 0.01;
      Debug.logVerbose(`this.asyncNodes.length: ${this.asyncNodes.length}`);
      Debug.logVerbose(`this.flowWorkQueue.length: ${this.flowWorkQueue.length}`);
    } while ((this.asyncNodes.length > 0 || this.flowWorkQueue.length > 0) && timeUsed < timeLimit && stepsExecuted < stepLimit);

    return stepsExecuted;
  }
}
