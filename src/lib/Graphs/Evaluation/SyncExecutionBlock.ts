import Assert from '../../Diagnostics/Assert';
import Logger from '../../Diagnostics/Logger';
import { EventListener } from '../../Events/EventListener';
import NodeEvalContext from '../../Nodes/NodeEvalContext';
import NodeSocketRef from '../../Nodes/NodeSocketRef';
import Socket from '../../Sockets/Socket';
import Graph from '../Graph';
import GraphEvaluator from './GraphEvaluator';

export default class SyncExecutionBlock {
  private readonly syncEvaluationCompletedListenerStack : EventListener<void>[] = [];
  private readonly graph: Graph;

  constructor(
    public graphEvaluator: GraphEvaluator,
    public nextEval: NodeSocketRef | null,
    syncEvaluationCompletedListener: EventListener<void> | undefined = undefined,
  ) {
    this.graph = graphEvaluator.graph;
    if (syncEvaluationCompletedListener !== undefined) {
      this.syncEvaluationCompletedListenerStack.push(syncEvaluationCompletedListener);
    }
  }

  // NOTE: This is a simplistic recursive and wasteful approach.
  // Is is optimal for a tree, but can do a lot of duplicate evaluations in dense graphs.
  // It will also get stuck in a recursive loop when there are loops in the graph.
  // TODO: Replace with initial traversal to extract sub DAG, order it, and evaluate each node once.
  resolveInputValueFromSocket(inputSocket: Socket): any {
    if (inputSocket.valueTypeName === 'flow') {
      throw new Error(`can not resolve input values for Eval input sockets: ${inputSocket.name}`);
    }

    // if it has no links, return the immediate value
    if (inputSocket.links.length === 0) {
      // if not set, use the default value for this valueType
      if (inputSocket.value === undefined) {
        return this.graph.registry.values.get(inputSocket.valueTypeName).creator();
      }
      return inputSocket.value;
    }
    if (inputSocket.links.length > 1) {
      throw new Error(`input socket has too many links: ${inputSocket.name} has ${inputSocket.links.length} links`);
    }

    // if upstream node is an eval, we just return its last value.
    const upstreamNode = this.graph.nodes[inputSocket.links[0].nodeId];

    // what is inputSocket connected to?
    const upstreamOutputSocket = upstreamNode.getOutputSocket(inputSocket.links[0].socketName);

    if (upstreamNode.flow) {
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

    Logger.verbose(`SyncExecutionBlock: evaluating immediate node ${upstreamNode.typeName}`);

    const context = new NodeEvalContext(this, upstreamNode);
    context.evalImmediate();

    // get the output value we wanted.
    // eslint-disable-next-line no-param-reassign
    inputSocket.value = upstreamOutputSocket.value;

    return inputSocket.value;
  }

  // this is syncCommit.
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
  commit(outputFlowSocket: NodeSocketRef, syncEvaluationCompletedListener: EventListener<void> | undefined = undefined) {
    Assert.mustBeTrue(this.nextEval === null);
    const node = this.graph.nodes[outputFlowSocket.nodeId];
    const outputSocket = node.getOutputSocket(outputFlowSocket.socketName);

    Logger.verbose(`SyncExecutionBlock: commit: ${node.typeName}.${outputSocket.name}`);

    if (outputSocket.links.length > 1) {
      throw new Error('invalid for an output flow socket to have multiple downstream links:'
      + `${node.typeName}.${outputSocket.name} has ${outputSocket.links.length} downlinks`);
    }
    if (outputSocket.links.length === 1) {
      Logger.verbose(`SyncExecutionBlock: scheduling next flow node: ${outputSocket.links[0].nodeId}.${outputSocket.links[0].socketName}`);

      const link = outputSocket.links[0];
      if (link === undefined) {
        throw new Error('link must be defined');
      }
      this.nextEval = link;
    }
    if (outputSocket.links.length === 0) {
      Logger.verbose('SyncExecutionBlock: nothing attached to output flow socket, no execution done');
    }

    if (syncEvaluationCompletedListener !== undefined) {
      this.syncEvaluationCompletedListenerStack.push(syncEvaluationCompletedListener);
    }
  }

  // returns the number of new execution steps created as a result of this one step
  executeStep(): boolean {
    // pop the next node off the queue
    const nodeSocketRef = this.nextEval;
    this.nextEval = null;

    // nothing waiting, thus go back and start to evaluate any callbacks, in stack order.
    if (nodeSocketRef === null) {
      if (this.syncEvaluationCompletedListenerStack.length === 0) {
        return false;
      }
      const awaitingCallback = this.syncEvaluationCompletedListenerStack.pop();
      if (awaitingCallback === undefined) {
        throw new Error('awaitingCallback is empty');
      }
      awaitingCallback();
      return true;
    }

    const node = this.graph.nodes[nodeSocketRef.nodeId];
    Logger.verbose(`evaluating node: ${node.typeName}`);

    // first resolve all input values
    // flow socket is set to true for the one flowing in, while all others are set to false.
    node.inputSockets.forEach((inputSocket) => {
      if (inputSocket.valueTypeName !== 'flow') {
        // eslint-disable-next-line no-param-reassign
        this.resolveInputValueFromSocket(inputSocket);
      } else {
        // eslint-disable-next-line no-param-reassign
        inputSocket.value = (inputSocket.name === nodeSocketRef.socketName); // is this required?
      }
    });

    Logger.verbose(`GraphEvaluator: evaluating flow node ${node.typeName}`);

    const context = new NodeEvalContext(this, node);
    context.evalFlow();

    // Auto-commit if no existing commits and no promises waiting.
    if (context.numCommits === 0 && !context.asyncPending) {
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
