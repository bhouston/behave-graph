import { Assert } from '../Diagnostics/Assert';
import { Logger } from '../Diagnostics/Logger';
import { CustomEvent } from '../Events/CustomEvent';
import { EventEmitter } from '../Events/EventEmitter';
import { EventListener } from '../Events/EventListener';
import { GraphEvaluator } from '../Graphs/Evaluation/GraphEvaluator';
import { NodeEvaluationEvent } from '../Graphs/Evaluation/NodeEvaluationEvent';
import { NodeEvaluationType } from '../Graphs/Evaluation/NodeEvaluationType';
import { SyncExecutionBlock } from '../Graphs/Evaluation/SyncExecutionBlock';
import { Graph } from '../Graphs/Graph';
import { Variable } from '../Variables/Variable';
import { Node } from './Node';
import { NodeSocketRef } from './NodeSocketRef';

// Purpose:
//  - Avoid nodes having to access globals to reference the scene or trigger loaders.
//  - Everything should be accessible via this context.
// Q: Should I store the promises in this structure?  Probably.
export class NodeEvalContext {
  public readonly graph: Graph;
  public readonly graphEvaluator: GraphEvaluator;
  public readonly onAsyncCancelled = new EventEmitter<void>();
  private readonly cachedInputValues: { [name: string]: any } = {}; // TODO: figure out if this is really needed
  private readonly cachedOutputValues: { [name: string]: any } = {}; // TODO: figure out if this is really needed
  public asyncPending = false;
  public numCommits = 0;

  constructor(
    public readonly syncExecutionBlock: SyncExecutionBlock,
    public readonly node: Node
  ) {
    this.graphEvaluator = syncExecutionBlock.graphEvaluator;
    this.graph = this.graphEvaluator.graph;
  }

  private begin() {
    Assert.mustBeTrue(this.node.async === true);
    if (this.node.interruptibleAsync) {
      this.graphEvaluator.interruptibleAsyncNodes.push(this.node);
    } else {
      this.graphEvaluator.asyncNodes.push(this.node);
    }
    this.asyncPending = true;
    this.graphEvaluator.onNodeEvaluation.emit(
      new NodeEvaluationEvent(this.node, NodeEvaluationType.Flow, true)
    );
  }

  cancel() {
    Assert.mustBeTrue(this.node.async === true);
    Assert.mustBeTrue(this.asyncPending === true);
    this.onAsyncCancelled.emit();
    this.finish();
  }

  finish() {
    Assert.mustBeTrue(this.node.async === true);
    Assert.mustBeTrue(this.asyncPending === true);
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
  }

  evalFlow() {
    // confirm assumptions for an immediate evaluation
    Assert.mustBeTrue(
      this.node.flow,
      'can not use evalFlow on non-Flow nodes, use evalImmediate instead'
    );

    if (this.node.async) {
      this.begin();
    } else {
      this.graphEvaluator.onNodeEvaluation.emit(
        new NodeEvaluationEvent(this.node, NodeEvaluationType.Flow, false)
      );
    }

    // read inputs all at once to avoid async inconsistencies.
    this.readInputs();

    this.node.evalFunc(this);

    if (!this.node.async) {
      this.writeOutputs(); // TODO: replace this with commit(), no need for this overlapping duplicate codex
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

    // read inputs all at once to avoid async inconsistencies.
    this.readInputs();

    this.node.evalFunc(this);

    // confirm assumptions for immediate evaluation.
    Assert.mustBeTrue(
      !this.node.async,
      'evalImmediate can not handle evalPromise nodes, use evalFlow instead'
    );

    this.writeOutputs();

    this.graphEvaluator.onNodeEvaluation.emit(
      new NodeEvaluationEvent(this.node, NodeEvaluationType.None, false)
    );
  }

  private readInputs() {
    // cache all input values - required for proper async operation?  I think so.
    // Maybe not in loops where it wants to check inputs? Or only when there is a new eval?
    this.node.inputSockets.forEach((socket) => {
      this.cachedInputValues[socket.name] = socket.value;
    });
  }

  private writeOutputs() {
    // this writes all output values to either a defined or undefined value.  Thus it resets whatever was there before
    // this feels like the correct behavior.
    this.node.outputSockets.forEach((socket) => {
      // eslint-disable-next-line no-param-reassign
      socket.value = this.cachedOutputValues[socket.name];
    });
  }

  getCustomEvent(customEventId: string): CustomEvent {
    const customEvent = this.graph.customEvents[customEventId];
    if (customEvent === undefined) {
      throw new Error(`can not find customEvent with the id ${customEventId}`);
    }
    return customEvent;
  }

  getVariable(variableId: string): Variable {
    const variable = this.graph.variables[variableId];
    if (variable === undefined) {
      throw new Error(`can not find variable with the id ${variableId}`);
    }
    return variable;
  }

  // TODO: this may want to cache the values on the creation of the NodeEvalContext
  // for re-entrant async operations, otherwise the inputs may change during operation.
  readInput<T>(inputName: string): T {
    const inputSocket = this.node.inputSockets.find(
      (socket) => socket.name === inputName
    );
    if (inputSocket === undefined) {
      throw new Error(`can not find input socket with name ${inputName}`);
    }
    return this.cachedInputValues[inputName] as T;
  }

  writeOutput<T>(outputName: string, value: T) {
    const outputSocket = this.node.outputSockets.find(
      (socket) => socket.name === outputName
    );
    if (outputSocket === undefined) {
      throw new Error(
        `can not find output socket with name ${outputName} on node of type ${this.node.typeName}`
      );
    }
    if (outputSocket.valueTypeName === 'flow') {
      throw new Error(
        `can not set the value of Flow output socket ${outputName}, use commit() instead`
      );
    }
    this.cachedOutputValues[outputName] = value;
  }

  // TODO: convert this to return a promise always.  It is up to the user to wait on it.
  commit(
    downstreamFlowSocketName: string,
    syncEvaluationCompletedListener: EventListener<void> | undefined = undefined
  ) {
    Logger.verbose(
      `commit: nodeId ${this.node.id} and output socket name ${downstreamFlowSocketName}, and the node type is ${this.node.typeName}`
    );
    this.numCommits++;
    this.writeOutputs();
    if (this.node.async) {
      this.graphEvaluator.asyncCommit(
        new NodeSocketRef(this.node.id, downstreamFlowSocketName),
        syncEvaluationCompletedListener
      );
    } else {
      this.syncExecutionBlock.commit(
        new NodeSocketRef(this.node.id, downstreamFlowSocketName),
        syncEvaluationCompletedListener
      );
    }
  }
}
