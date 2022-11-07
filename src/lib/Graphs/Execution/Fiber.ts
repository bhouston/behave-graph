import { Assert } from '../../Diagnostics/Assert.js';
import { AsyncNode } from '../../Nodes/AsyncNode.js';
import { FlowNode } from '../../Nodes/FlowNode.js';
import { ImmediateNode } from '../../Nodes/ImmediateNode.js';
import { Link } from '../../Nodes/Link.js';
import { Node } from '../../Nodes/Node.js';
import { Socket } from '../../Sockets/Socket.js';
import { Graph } from '../Graph.js';
import { Engine } from './Engine.js';

export class Fiber {
  private readonly fiberCompletedListenerStack: (() => void)[] = [];
  private readonly graph: Graph;

  constructor(
    public engine: Engine,
    public nextEval: Link | null,
    fiberCompletedListener: (() => void) | undefined = undefined
  ) {
    this.graph = engine.graph;
    if (fiberCompletedListener !== undefined) {
      this.fiberCompletedListenerStack.push(fiberCompletedListener);
    }
  }

  // NOTE: This is a simplistic recursive and wasteful approach.
  // Is is optimal for a tree, but can do a lot of duplicate evaluations in dense graphs.
  // It will also get stuck in a recursive loop when there are loops in the graph.
  // TODO: Replace with initial traversal to extract sub DAG, order it, and evaluate each node once.
  resolveInputValueFromSocket(inputSocket: Socket): number {
    // if it has no links, return the immediate value
    if (inputSocket.links.length === 0) {
      return 0;
    }

    const upstreamLink = inputSocket.links[0];
    // if upstream node is an eval, we just return its last value.
    const upstreamNode = this.graph.nodes[upstreamLink.nodeId];

    // what is inputSocket connected to?
    const upstreamOutputSocket = upstreamNode.outputSockets.find(
      (socket) => socket.name === upstreamLink.socketName
    );
    if (upstreamOutputSocket === undefined) {
      throw new Error(
        `can not find socket with the name ${upstreamLink.socketName}`
      );
    }

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
    for (const upstreamInputSocket of upstreamNode.inputSockets) {
      executionStepCount +=
        this.resolveInputValueFromSocket(upstreamInputSocket);
    }

    this.engine.onNodeExecution.emit(upstreamNode);
    upstreamNode.exec();
    executionStepCount++;

    // get the output value we wanted.
    inputSocket.value = upstreamOutputSocket.value;

    return executionStepCount;
  }

  // this is syncCommit.
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
  commit(
    node: Node,
    outputSocketName: string,
    fiberCompletedListener: (() => void) | undefined = undefined
  ) {
    Assert.mustBeTrue(this.nextEval === null);
    const outputSocket = node.outputSockets.find(
      (socket) => socket.name === outputSocketName
    );
    if (outputSocket === undefined) {
      throw new Error(`can not find socket with the name ${outputSocketName}`);
    }

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

    if (fiberCompletedListener !== undefined) {
      this.fiberCompletedListenerStack.push(fiberCompletedListener);
    }
  }

  // returns the number of new execution steps created as a result of this one step
  executeStep(): number {
    // pop the next node off the queue
    const link = this.nextEval;
    this.nextEval = null;

    // nothing waiting, thus go back and start to evaluate any callbacks, in stack order.
    if (link === null) {
      if (this.fiberCompletedListenerStack.length === 0) {
        return -1;
      }
      const awaitingCallback = this.fiberCompletedListenerStack.pop();
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
    node.inputSockets.forEach((inputSocket) => {
      if (inputSocket.valueTypeName !== 'flow') {
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

    this.engine.onNodeExecution.emit(node);
    if (node instanceof AsyncNode) {
      this.engine.asyncNodes.push(node);
      node.exec(this, () => {
        const index = this.engine.asyncNodes.indexOf(node);
        this.engine.asyncNodes.splice(index, 1);
      });
    } else if (node instanceof FlowNode) {
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      node.exec(this);
      executionStepCount++;
    }

    return executionStepCount;
  }
}
