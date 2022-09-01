import Debug from '../../Debug';
import NodeEvalContext from '../../Nodes/NodeEvalContext';
import NodeSocketRef from '../../Nodes/NodeSocketRef';
import Socket from '../../Sockets/Socket';
import Graph from '../Graph';
import GraphEvaluator from './GraphEvaluator';
import { NodeEvalCallback } from './NodeCallback';

export default class SyncExecutionBlock {
  public awaitingCallbackStack : NodeEvalCallback[] = [];
  public graph: Graph;

  constructor(public evaluator: GraphEvaluator, public nextEval: NodeSocketRef) {
    this.graph = evaluator.graph;
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

    const context = new NodeEvalContext(this.evaluator, upstreamNode);
    context.evalImmediate();

    // get the output value we wanted.
    // eslint-disable-next-line no-param-reassign
    inputSocket.value = upstreamOutputSocket.value;

    return inputSocket.value;
  }

  // this is syncCommit.
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
  commit(outputFlowSocket: NodeSocketRef, downstreamAwaitCallback: NodeEvalCallback | undefined = undefined) {
    Debug.asset(this.nextEval === undefined);
    const node = this.graph.nodes[outputFlowSocket.nodeId];
    const outputSocket = node.getOutputSocket(outputFlowSocket.socketName);

    Debug.logVerbose(`GraphEvaluator: commit: ${node.typeName}.${outputSocket.name}`);

    if (outputSocket.links.length > 1) {
      throw new Error('invalid for an output flow socket to have multiple downstream links:'
      + `${node.typeName}.${outputSocket.name} has ${outputSocket.links.length} downlinks`);
    }
    if (outputSocket.links.length === 1) {
      Debug.logVerbose(`GraphEvaluator: scheduling next flow node: ${outputSocket.links[0].nodeId}.${outputSocket.links[0].socketName}`);

      const link = outputSocket.links[0];
      if (link === undefined) {
        throw new Error('link must be defined');
      }
      this.nextEval = link;
    }

    if (downstreamAwaitCallback !== undefined) {
      this.awaitingCallbackStack.push(downstreamAwaitCallback);
    }
  }

  // returns the number of new execution steps created as a result of this one step
  executeStep(): boolean {
    // pop the next node off the queue
    const nodeSocketRef = this.nextEval;

    // nothing waiting, thus go back and start to evaluate any callbacks, in stack order.
    if (nodeSocketRef === undefined) {
      if (this.awaitingCallbackStack.length === 0) {
        return false;
      }
      const awaitingCallback = this.awaitingCallbackStack.pop();
      if (awaitingCallback === undefined) {
        throw new Error('awaitingCallback is empty');
      }
      awaitingCallback();
      return true;
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
}
