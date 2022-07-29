import Graph from './Graph';
import Node from '../Nodes/Node';
import { SocketValueType } from '../Sockets/SocketValueType';
import NodeEvalContext from '../Nodes/NodeEvalContext';
import Socket from '../Sockets/Socket';

export default class GraphEvaluator {
  public nodeWorkQueue: Node[] = [];

  constructor(public context: NodeEvalContext, public graph: Graph) {
  }

  trigger(triggerName: string): number {
    // look up any nodes with this trigger name and add them to the executionQueue
    const triggerNodes = this.graph.nodes.filter((item) => (item.type === triggerName));

    if (triggerNodes.length > 0) {
      // add to the back of the queue
      this.nodeWorkQueue.push(...triggerNodes);
    }

    // inform how many trigger nodes were triggered
    return triggerNodes.length;
  }

  prioritizeNode(node: Node) {
    // remove from the queue if it is exists
    this.nodeWorkQueue = this.nodeWorkQueue.filter((item) => (item !== node));

    // add to front of queue
    this.nodeWorkQueue.unshift(node);
  }

  // NOTE: This is a simplistic recursive and wasteful approach.
  // Is is optimal for a tree, but can do a lot of duplicate evaluates in dense graphs.
  // It will also get stuck in a recursive loop when there are loops in the graph.
  // TODO: Replace with initial traversal to extract sub DAG, order it, and evaluate each node once.
  resolveInputValueFromSocket(inputSocket: Socket): any {
    if (inputSocket.valueType === SocketValueType.Eval) {
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
    const upstreamOutputSocket = this.graph.getOutputSocket(inputSocket.links[1]);

    // if upstream node is an eval, we just return its last value.
    const upstreamNode = this.graph.nodes[inputSocket.links[1].nodeIndex];
    if (upstreamNode.isEvalNode) {
      return upstreamOutputSocket.value;
    }

    // resolve all inputs for the upstream node (this is where the recursion happens)
    // TODO: This is a bit dangerous as if there are loops in the graph, this will blow up the stack
    upstreamNode.inputSockets.forEach((upstreamInputSocket) => {
      // eslint-disable-next-line no-param-reassign
      this.resolveInputValueFromSocket(upstreamInputSocket);
    });

    // evaluate the node
    upstreamNode.func(this.context);

    // get the output value we wanted.
    // eslint-disable-next-line no-param-reassign
    inputSocket.value = upstreamOutputSocket.value;

    return inputSocket.value;
  }

  // returns the number of new execution steps created as a result of this one step
  executeStep(): number {
    // pop the next node off the queue
    const node = this.nodeWorkQueue.shift();
    // no work waiting!
    if (node === undefined) {
      return 0;
    }

    console.log(`evaluating node: ${node.nodeName}`);

    // first resolve all input values
    node.inputSockets.forEach((inputSocket) => {
      // eslint-disable-next-line no-param-reassign
      inputSocket.value = this.resolveInputValueFromSocket(inputSocket);
    });

    console.log('inputs: ', inputValues);

    // this is where the promise would be;
    const context = new NodeEvalContext();
    const outputValues = nextNode.nodeSpec.func(context, inputValues);

    console.log('outputs: ', outputValues);

    // push results to the inputs of downstream nodes.
    // TODO: ensure all non-eval outputs have values.  Otherwise throw an error.
    outputValues.forEach((outputValue, outputName) => {
      const outputSocket = nextNode.outputSockets.get(outputName);
      if (outputSocket === undefined) throw new Error('can not be undefined');
      const outputSocketSpec = nextNode.nodeSpec.outputSocketSpecs.get(outputName);
      if (outputSocketSpec === undefined) throw new Error('can not be undefined');

      if (outputSocketSpec.valueType === SocketValueType.Eval) {
        if (outputSocket.downlinks.length > 1) throw new Error('eval downlinks must = 1');

        outputSocket?.downlinks.forEach((nodeSocketRef) => {
          const downlinkNode = this.graph.nodes[nodeSocketRef.nodeIndex];

          // no values explicitly passed down links, all values are pulled when needed.

          // if type is eval, ensure node is queued up.
          this.nodeWorkQueue.push(downlinkNode);
        });
      } else {
        // store the output value for immediate evaluation purposes - this is only done on eval output sockets.
        outputSocket.value = outputValue;
      }
    });

    return 1;
  }

  executeSteps(maximumSteps: number): number {
    let stepsExecuted = 0;
    while ((maximumSteps - stepsExecuted) > 0) {
      if (this.executeStep() === 0) { break; }
      stepsExecuted++;
    }
    return stepsExecuted;
  }
}
