import Debug from '../Debug';
import NodeEvalContext from '../Nodes/NodeEvalContext';
import NodeSocketRef from '../Nodes/NodeSocketRef';
import Socket from '../Sockets/Socket';
import { SocketValueType } from '../Sockets/SocketValueType';
import Graph from './Graph';

export default class GraphEvaluator {
  // tracking the next node+input socket to execute.
  public flowWorkQueue: NodeSocketRef[] = [];

  constructor(public graph: Graph, public verbose = false) {
  }

  // maybe this should have an id?
  // IMPORTANT: should events somehow register themselves at graph initialization?  There is a missing step here.
  // This simplistic approach is okay if events do no have filters themselves.
  triggerEvents(nodeName: string, outputValues: Map<string, any> = new Map<string, any>()): number {
    // look up any nodes with this trigger name and add them to the executionQueue
    const nodes = this.graph.nodes.filter((node) => (node.nodeName === nodeName));

    nodes.forEach((node) => {
      // apply output values
      outputValues.forEach((value, name) => {
        // eslint-disable-next-line no-param-reassign
        node.getOutputSocket(name).value = value;
      });

      let flowOutputCount = 0;
      node.outputSockets.forEach((outputSocket) => {
        // console.log(outputSocket);
        if (outputSocket.valueType === SocketValueType.Flow) {
          if (outputSocket.links.length === 1) {
            this.flowWorkQueue.push(outputSocket.links[0]);
            flowOutputCount++;
          }
          if (outputSocket.links.length > 1) {
            throw new Error(`flow output ${node.nodeName}.${outputSocket.name} has more than 1 downstream link, ${outputSocket.links.length}`);
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
    if (inputSocket.valueType === SocketValueType.Flow) {
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
    const upstreamNode = this.graph.nodes[inputSocket.links[0].nodeIndex];
    if (upstreamNode.isEvalNode) {
      return upstreamOutputSocket.value;
    }

    // resolve all inputs for the upstream node (this is where the recursion happens)
    // TODO: This is a bit dangerous as if there are loops in the graph, this will blow up the stack
    upstreamNode.inputSockets.forEach((upstreamInputSocket) => {
      // eslint-disable-next-line no-param-reassign
      this.resolveInputValueFromSocket(upstreamInputSocket);
    });

    Debug.log(`GraphEvaluator: evaluating immediate node ${upstreamNode.nodeName}`);

    const context = new NodeEvalContext(this, upstreamNode);
    context.evalImmediate();

    // get the output value we wanted.
    // eslint-disable-next-line no-param-reassign
    inputSocket.value = upstreamOutputSocket.value;

    return inputSocket.value;
  }

  commit(outputFlowSocket: NodeSocketRef, onDownstreamCompleted: (()=> void) | undefined = undefined) {
    const node = this.graph.nodes[outputFlowSocket.nodeIndex];
    const outputSocket = node.getOutputSocket(outputFlowSocket.socketName);

    Debug.log(`GraphEvaluator: commit: ${node.nodeName}.${outputSocket.name}`);

    if (outputSocket.links.length > 1) {
      throw new Error('invalid for an output flow socket to have multiple downstream links:'
      + `${node.nodeName}.${outputSocket.name} has ${outputSocket.links.length} downlinks`);
    }
    if (outputSocket.links.length === 1) {
      Debug.log(`GraphEvaluator: scheduling next flow node: ${outputSocket.links[0].nodeIndex}.${outputSocket.links[0].socketName}`);

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

    const node = this.graph.nodes[nodeSocketRef.nodeIndex];
    Debug.log(`evaluating node: ${node.nodeName}`);

    // first resolve all input values
    // flow socket is set to true for the one flowing in, while all others are set to false.
    node.inputSockets.forEach((inputSocket) => {
      if (inputSocket.valueType !== SocketValueType.Flow) {
        // eslint-disable-next-line no-param-reassign
        this.resolveInputValueFromSocket(inputSocket);
      } else {
        // eslint-disable-next-line no-param-reassign
        inputSocket.value = (inputSocket.name === nodeSocketRef.socketName);
      }
    });

    Debug.log(`GraphEvaluator: evaluating flow node ${node.nodeName}`);

    const context = new NodeEvalContext(this, node);
    context.evalFlow();

    // Auto-commit if no existing commits and no promises waiting.
    if (context.numCommits === 0 && context.evalPromise === undefined) {
      // ensure this is auto-commit compatible.
      let numFlowOutputs = 0;
      node.outputSockets.forEach((outputSocket) => {
        if (outputSocket.valueType === SocketValueType.Flow) {
          numFlowOutputs++;
        }
      });

      if (numFlowOutputs !== 1) {
        throw new Error(`can not use auto-commit if there are multiple flow outputs, number of outputs is ${numFlowOutputs} on ${node.nodeName}`);
      }

      node.outputSockets.forEach((outputSocket) => {
        if (outputSocket.valueType === SocketValueType.Flow) {
          this.commit(new NodeSocketRef(nodeSocketRef.nodeIndex, outputSocket.name));
        }
      });
    }

    return true;
  }

  // NOTE: This does not execute all if there are promises.
  executeAll(optionalStepLimit: number = -1): number {
    let stepsExecuted = 0;
    while ((optionalStepLimit < 0 || stepsExecuted < optionalStepLimit) && this.executeStep()) {
      stepsExecuted++;
    }
    return stepsExecuted;
  }
}
