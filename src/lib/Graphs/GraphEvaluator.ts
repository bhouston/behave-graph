import Graph from './Graph';
import { SocketValueType } from '../Sockets/SocketValueType';
import NodeEvalContext from '../Nodes/NodeEvalContext';
import Socket from '../Sockets/Socket';
import { NodeEvalStatus } from '../Nodes/NodeEvalStatus';
import NodeSocketRef from '../Nodes/NodeSocketRef';

export default class GraphEvaluator {
  // tracking the next node+input socket to execute.
  public flowWorkQueue: NodeSocketRef[] = [];

  constructor(public graph: Graph) {
  }

  // maybe this should have an id?
  // IMPORTANT: should events somehow register themselves at graph initialization?  There is a missing step here.
  // This simplistic approach is okay if events do no have filters themselves.
  triggerEvents(nodeName: string, outputValues: Map<string, any>): number {
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
          if (outputSocket.value === true && outputSocket.links.length === 1) {
            this.flowWorkQueue.push(outputSocket.links[0]);
            flowOutputCount++;
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

    const context = new NodeEvalContext(this.graph, upstreamNode);
    context.evalImmediate();

    if (context.evalStatus !== NodeEvalStatus.Done) {
      throw new Error(`error status from node eval: ${context.evalStatus}`);
    }

    // get the output value we wanted.
    // eslint-disable-next-line no-param-reassign
    inputSocket.value = upstreamOutputSocket.value;

    return inputSocket.value;
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
    // console.log(`evaluating node: ${node.nodeName}`);

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

    // this is where the promise would be;
    // console.log('inputs: ', node.inputSockets);

    const context = new NodeEvalContext(this.graph, node);
    context.evalFlow();

    // console.log(context);

    if (context.evalStatus !== NodeEvalStatus.Done) {
      throw new Error(`error status from node eval: ${context.evalStatus.toString}`);
    }

    // console.log('outputs: ', node.outputSockets);

    // enqueue the next flow nodes.
    node.outputSockets.forEach((outputSocket) => {
      if (outputSocket.valueType === SocketValueType.Flow) {
        if (outputSocket.value === true) {
          this.flowWorkQueue.push(outputSocket.links[0]);
        }
      }
    });

    return true;
  }

  executeAll(optionalStepLimit: number = -1): number {
    let stepsExecuted = 0;
    while ((optionalStepLimit < 0 || stepsExecuted < optionalStepLimit) && this.executeStep()) {
      stepsExecuted++;
    }
    return stepsExecuted;
  }
}
