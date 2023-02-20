import { Assert } from '../Diagnostics/Assert';
import { GraphNodes } from '../Graphs/Graph';
import { Link } from '../Nodes/Link';
import { INode, isAsyncNode, isFlowNode } from '../Nodes/NodeInstance';
import { Engine } from './Engine';
import { resolveSocketValue } from './resolveSocketValue';

export class Fiber {
  private readonly fiberCompletedListenerStack: (() => void)[] = [];
  private readonly nodes: GraphNodes;
  public executionSteps = 0;

  constructor(
    public engine: Engine,
    public nextEval: Link | null,
    fiberCompletedListener: (() => void) | undefined = undefined
  ) {
    this.nodes = engine.nodes;
    if (fiberCompletedListener !== undefined) {
      this.fiberCompletedListenerStack.push(fiberCompletedListener);
    }
  }

  // this is syncCommit.
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
  commit(
    node: INode,
    outputSocketName: string,
    fiberCompletedListener: (() => void) | undefined = undefined
  ) {
    Assert.mustBeTrue(isFlowNode(node));
    Assert.mustBeTrue(this.nextEval === null);

    const outputSocket = node.outputs.find(
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
  executeStep() {
    // pop the next node off the queue
    const link = this.nextEval;
    this.nextEval = null;

    // nothing waiting, thus go back and start to evaluate any callbacks, in stack order.
    if (link === null) {
      if (this.fiberCompletedListenerStack.length === 0) {
        return;
      }
      const awaitingCallback = this.fiberCompletedListenerStack.pop();
      if (awaitingCallback === undefined) {
        throw new Error('awaitingCallback is empty');
      }
      awaitingCallback();
      return;
    }

    const node = this.nodes[link.nodeId];

    node.inputs.forEach((inputSocket) => {
      if (inputSocket.valueTypeName !== 'flow') {
        this.executionSteps += resolveSocketValue(this.engine, inputSocket);
      }
    });

    // first resolve all input values
    // flow socket is set to true for the one flowing in, while all others are set to false.
    this.engine.onNodeExecutionStart.emit(node);
    if (isAsyncNode(node)) {
      this.engine.asyncNodes.push(node);
      node.triggered(this.engine, link.socketName, () => {
        // remove from the list of pending async nodes
        const index = this.engine.asyncNodes.indexOf(node);
        this.engine.asyncNodes.splice(index, 1);
        this.engine.onNodeExecutionEnd.emit(node);
        this.executionSteps++;
      });
      return;
    }
    if (isFlowNode(node)) {
      node.triggered(this, link.socketName);
      this.engine.onNodeExecutionEnd.emit(node);
      this.executionSteps++;
      return;
    }

    throw new TypeError(
      `should not get here, unhandled node ${node.description.typeName}`
    );
  }

  isCompleted() {
    return (
      this.fiberCompletedListenerStack.length === 0 && this.nextEval === null
    );
  }
}
