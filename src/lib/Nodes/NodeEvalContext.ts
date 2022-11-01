import { EventEmitter } from '../Events/EventEmitter.js';
import { GraphEvaluator } from '../Graphs/Evaluation/GraphEvaluator.js';
import { NodeEvaluationEvent } from '../Graphs/Evaluation/NodeEvaluationEvent.js';
import { NodeEvaluationType } from '../Graphs/Evaluation/NodeEvaluationType.js';
import { SyncExecutionBlock } from '../Graphs/Evaluation/SyncExecutionBlock.js';
import { Graph } from '../Graphs/Graph.js';
import { Socket } from '../Sockets/Socket.js';
import { Link } from './Link.js';
import { Node } from './Node.js';

// Purpose:
//  - Avoid nodes having to access globals to reference the scene or trigger loaders.
//  - Everything should be accessible via this context.
// Q: Should I store the promises in this structure?  Probably.
export class NodeEvalContext {
  public readonly graph: Graph;
  public readonly graphEvaluator: GraphEvaluator;
  public readonly onAsyncCancelled = new EventEmitter<void>();
  public asyncPending = false;
  public numCommits = 0;

  constructor(
    public readonly syncExecutionBlock: SyncExecutionBlock,
    public readonly node: Node,
    public readonly triggeringFlowSocket: Socket | undefined = undefined
  ) {
    this.graphEvaluator = syncExecutionBlock.graphEvaluator;
    this.graph = this.graphEvaluator.graph;
  }

  private begin() {
    //Assert.mustBeTrue(this.node.async === true);
    if (this.node.interruptibleAsync) {
      this.graphEvaluator.interruptibleAsyncNodes.push(this.node);
    } else {
      this.graphEvaluator.asyncNodes.push(this.node);
    }
    this.asyncPending = true;
    this.graphEvaluator.onNodeEvaluation.emit(
      new NodeEvaluationEvent(this.node, NodeEvaluationType.Flow, true)
    );
    //Assert.mustBeTrue(this.node.cachedContext === undefined);
    //this.node.cachedContext = this;
  }

  cancel() {
    //Assert.mustBeTrue(this.node.async === true);
    //Assert.mustBeTrue(this.asyncPending === true);
    this.onAsyncCancelled.emit();
    this.finish();
  }

  finish() {
    //Assert.mustBeTrue(this.node.async === true);
    //Assert.mustBeTrue(this.asyncPending === true);
    if (this.node.interruptibleAsync) {
      const index = this.graphEvaluator.interruptibleAsyncNodes.indexOf(
        this.node
      );
      this.graphEvaluator.interruptibleAsyncNodes.splice(index, 1);
    } else {
      const index = this.graphEvaluator.asyncNodes.indexOf(this.node);
      this.graphEvaluator.asyncNodes.splice(index, 1);
    }
    this.graphEvaluator.onNodeEvaluation.emit(
      new NodeEvaluationEvent(this.node, NodeEvaluationType.None, false)
    );

    //Assert.mustBeTrue(this.node.cachedContext === undefined);
    //this.node.cachedContext = undefined;
  }

  evalFlow() {
    // confirm assumptions for an immediate evaluation
    //Assert.mustBeTrue(
    //  this.node.flow,
    //  'can not use evalFlow on non-Flow nodes, use evalImmediate instead'
    //);

    if (this.node.async) {
      this.begin();
    } else {
      this.graphEvaluator.onNodeEvaluation.emit(
        new NodeEvaluationEvent(this.node, NodeEvaluationType.Flow, false)
      );
    }

    this.node.evalFunc(this);

    if (!this.node.async) {
      //this.writeOutputs(); // TODO: replace this with commit(), no need for this overlapping duplicate codex
      this.graphEvaluator.onNodeEvaluation.emit(
        new NodeEvaluationEvent(this.node, NodeEvaluationType.None, false)
      );
    }
  }

  evalImmediate() {
    // confirm assumptions for an immediate evaluation
    if (this.node.flow) {
      throw new Error(
        'can not evalImmediate on Flow nodes, use evalFlow instead'
      );
    }

    this.graphEvaluator.onNodeEvaluation.emit(
      new NodeEvaluationEvent(this.node, NodeEvaluationType.Immediate, false)
    );

    this.node.evalFunc(this);

    // confirm assumptions for immediate evaluation.
    //Assert.mustBeTrue(
    //  !this.node.async,
    //  'evalImmediate can not handle evalPromise nodes, use evalFlow instead'
    //);

    this.graphEvaluator.onNodeEvaluation.emit(
      new NodeEvaluationEvent(this.node, NodeEvaluationType.None, false)
    );
  }

  // TODO: convert this to return a promise always.  It is up to the user to wait on it.
  commit(
    downstreamFlowSocketName: string,
    syncEvaluationCompletedListener: (() => void) | undefined = undefined
  ) {
    this.numCommits++;
    if (this.node.async) {
      this.graphEvaluator.asyncCommit(
        new Link(this.node.id, downstreamFlowSocketName),
        syncEvaluationCompletedListener
      );
    } else {
      this.syncExecutionBlock.commit(
        new Link(this.node.id, downstreamFlowSocketName),
        syncEvaluationCompletedListener
      );
    }
  }
}
