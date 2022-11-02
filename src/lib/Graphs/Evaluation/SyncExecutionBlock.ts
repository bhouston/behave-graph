import { Assert } from '../../Diagnostics/Assert.js';
import { FlowNode } from '../../Nodes/FlowNode.js';
import { ImmediateNode } from '../../Nodes/ImmediateNode.js';
import { Link } from '../../Nodes/Link.js';
import { NodeEvalContext } from '../../Nodes/NodeEvalContext.js';
import { Socket } from '../../Sockets/Socket.js';
import { Graph } from '../Graph.js';
import { GraphEvaluator } from './GraphEvaluator.js';
import { NodeEvaluationEvent } from './NodeEvaluationEvent.js';
import { NodeEvaluationType } from './NodeEvaluationType.js';

export class SyncExecutionBlock {
  private readonly syncEvaluationCompletedListenerStack: (() => void)[] = [];
  private readonly graph: Graph;

  constructor(
    public graphEvaluator: GraphEvaluator,
    public nextEval: Link | null,
    syncEvaluationCompletedListener: (() => void) | undefined = undefined
  ) {
    this.graph = graphEvaluator.graph;
    if (syncEvaluationCompletedListener !== undefined) {
      this.syncEvaluationCompletedListenerStack.push(
        syncEvaluationCompletedListener
      );
    }
  }

  // NOTE: This is a simplistic recursive and wasteful approach.
  // Is is optimal for a tree, but can do a lot of duplicate evaluations in dense graphs.
  // It will also get stuck in a recursive loop when there are loops in the graph.
  // TODO: Replace with initial traversal to extract sub DAG, order it, and evaluate each node once.
  resolveInputValueFromSocket(inputSocket: Socket): number {
    if (inputSocket.valueTypeName === 'flow') {
      throw new Error(
        `can not resolve input values for Eval input sockets: ${inputSocket.name}`
      );
    }

    // if it has no links, return the immediate value
    if (inputSocket.links.length === 0) {
      return 0;
    }
    if (inputSocket.links.length > 1) {
      throw new Error(
        `input socket has too many links: ${inputSocket.name} has ${inputSocket.links.length} links`
      );
    }

    const upstreamLink = inputSocket.links[0];
    // if upstream node is an eval, we just return its last value.
    const upstreamNode = this.graph.nodes[upstreamLink.nodeId];

    // what is inputSocket connected to?
    const upstreamOutputSocket =
      upstreamNode.outputSockets[upstreamLink.socketName];

    if (upstreamNode instanceof FlowNode) {
      inputSocket.value = upstreamOutputSocket.value;
      return 0;
    }

    if (!(upstreamNode instanceof ImmediateNode)) {
      throw new TypeError('node must be an instance of ImmediateNode');
    }

    let executionStepCount = 0;
    // resolve all inputs for the upstream node (this is where the recursion happens)
    // TODO: This is a bit dangerous as if there are loops in the graph, this will blow up the stack
    upstreamNode.inputSocketList.forEach((upstreamInputSocket) => {
      executionStepCount +=
        this.resolveInputValueFromSocket(upstreamInputSocket);
    });

    this.graphEvaluator.onNodeEvaluation.emit(
      new NodeEvaluationEvent(upstreamNode, NodeEvaluationType.Immediate, false)
    );

    upstreamNode.evalFunc();
    executionStepCount++;

    this.graphEvaluator.onNodeEvaluation.emit(
      new NodeEvaluationEvent(upstreamNode, NodeEvaluationType.None, false)
    );

    // get the output value we wanted.
    inputSocket.value = upstreamOutputSocket.value;

    return executionStepCount;
  }

  // this is syncCommit.
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
  commit(
    outputFlowSocket: Link,
    syncEvaluationCompletedListener: (() => void) | undefined = undefined
  ) {
    Assert.mustBeTrue(this.nextEval === null);
    const node = this.graph.nodes[outputFlowSocket.nodeId];
    const outputSocket = node.outputSockets[outputFlowSocket.socketName];

    if (outputSocket.links.length > 1) {
      throw new Error(
        'invalid for an output flow socket to have multiple downstream links:' +
          `${node.description.typeName}.${outputSocket.name} has ${outputSocket.links.length} downlinks`
      );
    }
    if (outputSocket.links.length === 1) {
      const link = outputSocket.links[0];
      if (link === undefined) {
        throw new Error('link must be defined');
      }
      this.nextEval = link;
    }

    if (syncEvaluationCompletedListener !== undefined) {
      this.syncEvaluationCompletedListenerStack.push(
        syncEvaluationCompletedListener
      );
    }
  }

  // returns the number of new execution steps created as a result of this one step
  executeStep(): number {
    // pop the next node off the queue
    const link = this.nextEval;
    this.nextEval = null;

    // nothing waiting, thus go back and start to evaluate any callbacks, in stack order.
    if (link === null) {
      if (this.syncEvaluationCompletedListenerStack.length === 0) {
        return -1;
      }
      const awaitingCallback = this.syncEvaluationCompletedListenerStack.pop();
      if (awaitingCallback === undefined) {
        throw new Error('awaitingCallback is empty');
      }
      awaitingCallback();
      return 0;
    }

    const node = this.graph.nodes[link.nodeId];

    let triggeringFlowSocket = undefined;

    let executionStepCount = 0;

    // first resolve all input values
    // flow socket is set to true for the one flowing in, while all others are set to false.
    node.inputSocketList.forEach((inputSocket) => {
      //Logger.verbose(`scanning input socket: ${inputSocket.name}`);
      if (inputSocket.valueTypeName !== 'flow') {
        // eslint-disable-next-line no-param-reassign
        //Logger.verbose(
        //  `resolving input value for non-flow socket: ${inputSocket.name}`
        //);
        executionStepCount += this.resolveInputValueFromSocket(inputSocket);
      } else {
        if (inputSocket.name === link.socketName) {
          // eslint-disable-next-line no-param-reassign
          inputSocket.value = true; // is this required?  if there are multiple input flows, yes it is.
          triggeringFlowSocket = inputSocket;
        } else {
          // eslint-disable-next-line no-param-reassign
          inputSocket.value = false;
        }
      }
    });

    const context = new NodeEvalContext(this, node, triggeringFlowSocket);
    context.evalFlow();
    executionStepCount++;

    // Auto-commit if no existing commits and no promises waiting.
    if (context.numCommits === 0 && !context.asyncPending) {
      // ensure this is auto-commit compatible.
      let numFlowOutputs = 0;
      node.outputSocketList.forEach((outputSocket) => {
        if (outputSocket.valueTypeName === 'flow') {
          numFlowOutputs++;
        }
      });

      if (numFlowOutputs !== 1) {
        throw new Error(
          `can not use auto-commit if there are multiple flow outputs, number of outputs is ${numFlowOutputs} on ${node.description.typeName}`
        );
      }

      node.outputSocketList.forEach((outputSocket) => {
        if (outputSocket.valueTypeName === 'flow') {
          this.commit(new Link(link.nodeId, outputSocket.name));
        }
      });
    }

    return executionStepCount;
  }
}
