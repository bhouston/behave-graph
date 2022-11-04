import { EventEmitter } from '../Events/EventEmitter.js';
import { Engine } from '../Graphs/Execution/Engine.js';
import { Fiber } from '../Graphs/Execution/Fiber.js';
import { Graph } from '../Graphs/Graph.js';
import { Socket } from '../Sockets/Socket.js';
import { AsyncNode } from './AsyncNode.js';
import { EventNode } from './EventNode.js';
import { FlowNode } from './FlowNode.js';
import { Link } from './Link.js';
import { Node } from './Node.js';

// Purpose:
//  - Avoid nodes having to access globals to reference the scene or trigger loaders.
//  - Everything should be accessible via this context.
// Q: Should I store the promises in this structure?  Probably.
export class NodeEvalContext {
  public readonly graph: Graph;
  public readonly engine: Engine;
  public readonly onAsyncCancelled = new EventEmitter<void>();
  public asyncPending = false;
  public numCommits = 0;

  constructor(
    public readonly fiber: Fiber,
    public readonly node: Node,
    public readonly triggeringFlowSocket: Socket | undefined = undefined
  ) {
    this.engine = fiber.engine;
    this.graph = this.engine.graph;
  }

  private begin() {
    //Assert.mustBeTrue(this.node.async === true);
    if (this.node instanceof EventNode) {
      this.engine.eventNodes.push(this.node);
    } else if (this.node instanceof AsyncNode) {
      this.engine.asyncNodes.push(this.node);
    } else {
      throw new TypeError('unsupported node type');
    }
    this.asyncPending = true;
  }

  cancel() {
    this.onAsyncCancelled.emit();
    this.finish();
  }

  finish() {
    if (this.node instanceof EventNode) {
      const index = this.engine.eventNodes.indexOf(this.node);
      this.engine.eventNodes.splice(index, 1);
    } else if (this.node instanceof AsyncNode) {
      const index = this.engine.asyncNodes.indexOf(this.node);
      this.engine.asyncNodes.splice(index, 1);
    } else {
      throw new TypeError('unsupported node type');
    }
  }

  evalFlow() {
    const flowNode = this.node;
    if (!(flowNode instanceof FlowNode)) {
      throw new TypeError('node must be instance of FlowNode');
    }

    const isAsync = flowNode instanceof AsyncNode;
    if (isAsync) {
      this.begin();
    }

    this.engine.onNodeEvaluation.emit(flowNode);
    flowNode.flowEvalFunc(this);
  }

  // TODO: convert this to return a promise always.  It is up to the user to wait on it.
  commit(
    downstreamFlowSocketName: string,
    syncEvaluationCompletedListener: (() => void) | undefined = undefined
  ) {
    this.numCommits++;
    if (this.node instanceof AsyncNode) {
      this.engine.commitToNewFiber(
        new Link(this.node.id, downstreamFlowSocketName),
        syncEvaluationCompletedListener
      );
    } else {
      this.fiber.commit(
        new Link(this.node.id, downstreamFlowSocketName),
        syncEvaluationCompletedListener
      );
    }
  }
}
