import EventEmitter from '../DesignPatterns/EventEmitter';
import { EventListener } from '../DesignPatterns/EventListener';
import Assert from '../Diagnostics/Assert';
import Logger from '../Diagnostics/Logger';
import GraphEvaluator from '../Graphs/Evaluation/GraphEvaluator';
import NodeEvaluationEvent from '../Graphs/Evaluation/NodeEvaluationEvent';
import { NodeEvaluationType } from '../Graphs/Evaluation/NodeEvaluationType';
import SyncExecutionBlock from '../Graphs/Evaluation/SyncExecutionBlock';
import Graph from '../Graphs/Graph';
import Variable from '../Variables/Variable';
import Node from './Node';
import NodeSocketRef from './NodeSocketRef';

// Purpose:
//  - Avoid nodes having to access globals to reference the scene or trigger loaders.
//  - Everything should be accessible via this context.
// Q: Should I store the promises in this structure?  Probably.
export default class NodeEvalContext {
  public readonly graph: Graph;
  public readonly graphEvaluator: GraphEvaluator;
  public readonly onAsyncCancelled = new EventEmitter<void>();
  private readonly cachedInputValues = new Map<string, any>(); // TODO: figure out if this is really needed
  private readonly cachedOutputValues = new Map<string, any>(); // TODO: figure out if this is really needed
  public async = false;
  public numCommits = 0;

  constructor(public readonly syncExecutionBlock: SyncExecutionBlock, public readonly node: Node) {
    this.graphEvaluator = syncExecutionBlock.graphEvaluator;
    this.graph = this.graphEvaluator.graph;
  }

  beginAsync() {
    Assert.mustBeTrue(this.async === false);
    if (this.node.nonBlockingAsync) {
      this.graphEvaluator.nonBlockingAsyncNodes.push(this.node);
    } else {
      this.graphEvaluator.asyncNodes.push(this.node);
    }
    this.async = true;
    this.graphEvaluator.onNodeEvaluation.emit(new NodeEvaluationEvent(this.node, NodeEvaluationType.Flow, true));
  }

  cancelAsync() {
    Assert.mustBeTrue(this.async === true);
    this.onAsyncCancelled.emit();
    this.endAsync();
  }

  endAsync() {
    Assert.mustBeTrue(this.async === true);
    if (this.node.nonBlockingAsync) {
      const index = this.graphEvaluator.nonBlockingAsyncNodes.indexOf(this.node);
      this.graphEvaluator.nonBlockingAsyncNodes.splice(index, 1);
    } else {
      const index = this.graphEvaluator.asyncNodes.indexOf(this.node);
      this.graphEvaluator.asyncNodes.splice(index, 1);
    }
    this.async = false;
    this.graphEvaluator.onNodeEvaluation.emit(new NodeEvaluationEvent(this.node, NodeEvaluationType.None, false));
  }

  evalFlow() {
    // confirm assumptions for an immediate evaluation
    Assert.mustBeTrue(this.node.isEvalNode, 'can not use evalFlow on non-Flow nodes, use evalImmediate instead');

    this.graphEvaluator.onNodeEvaluation.emit(new NodeEvaluationEvent(this.node, NodeEvaluationType.Flow, false));

    // read inputs all at once to avoid async inconsistencies.
    this.readInputs();

    this.node.evalFunc(this);

    if (!this.async) {
      this.writeOutputs(); // TODO: replace this with commit(), no need for this overlapping duplicate codex
      this.graphEvaluator.onNodeEvaluation.emit(new NodeEvaluationEvent(this.node, NodeEvaluationType.None, false));
    }
  }

  evalImmediate() {
    // confirm assumptions for an immediate evaluation
    if (this.node.isEvalNode) {
      throw new Error('can not evalImmediate on Flow nodes, use evalFlow instead');
    }

    this.graphEvaluator.onNodeEvaluation.emit(new NodeEvaluationEvent(this.node, NodeEvaluationType.Immediate, false));

    // read inputs all at once to avoid async inconsistencies.
    this.readInputs();

    this.node.evalFunc(this);

    // confirm assumptions for immediate evaluation.
    Assert.mustBeTrue(!this.async, 'evalImmediate can not handle evalPromise nodes, use evalFlow instead');

    this.writeOutputs();

    this.graphEvaluator.onNodeEvaluation.emit(new NodeEvaluationEvent(this.node, NodeEvaluationType.None, false));
  }

  private readInputs() {
    // cache all input values - required for proper async operation?  I think so.
    // Maybe not in loops where it wants to check inputs? Or only when there is a new eval?
    this.node.inputSockets.forEach((socket) => {
      this.cachedInputValues.set(socket.name, socket.value);
    });
  }

  private writeOutputs() {
    // this writes all output values to either a defined or undefined value.  Thus it resets whatever was there before
    // this feels like the correct behavior.
    this.node.outputSockets.forEach((socket) => {
      // eslint-disable-next-line no-param-reassign
      socket.value = this.cachedOutputValues.get(socket.name);
    });
  }

  getVariable(variableId: string): Variable {
    const variable = this.graph.variables[variableId];
    if (variable === undefined) throw new Error(`can not find variable with the id ${variableId}`);
    return variable;
  }

  // TODO: this may want to cache the values on the creation of the NodeEvalContext
  // for re-entrant async operations, otherwise the inputs may change during operation.
  getInputValue(inputName: string): any {
    const inputSocket = this.node.inputSockets.find((socket) => socket.name === inputName);
    if (inputSocket === undefined) {
      throw new Error(`can not find input socket with name ${inputName}`);
    }
    return this.cachedInputValues.get(inputName);
  }

  setOutputValue(outputName: string, value: any) {
    const outputSocket = this.node.outputSockets.find((socket) => socket.name === outputName);
    if (outputSocket === undefined) {
      throw new Error(`can not find output socket with name ${outputName}`);
    }
    if (outputSocket.valueTypeName === 'flow') {
      throw new Error(`can not set the value of Flow output socket ${outputName}, use commit() instead`);
    }
    this.cachedOutputValues.set(outputName, value);
  }

  // TODO: convert this to return a promise always.  It is up to the user to wait on it.
  commit(downstreamFlowSocketName: string, syncEvaluationCompletedListener: EventListener<void> | undefined = undefined) {
    Logger.verbose(`commit: nodeId ${this.node.id} and output socket name ${downstreamFlowSocketName}, and the node type is ${this.node.typeName}`);
    if (this.async) throw new Error('can not commit as currently in async mode, use asyncCommit instead.');
    this.numCommits++;
    this.writeOutputs();
    this.syncExecutionBlock.commit(new NodeSocketRef(this.node.id, downstreamFlowSocketName), syncEvaluationCompletedListener);
  }

  asyncCommit(downstreamFlowSocketName: string) {
    Logger.verbose(`asyncCommit: nodeId ${this.node.id} and output socket name ${downstreamFlowSocketName}, and the node type is ${this.node.typeName}`);
    if (!this.async) throw new Error('can not asyncCommit as not currently in async mode, use commit instead or set async mode enabled.');
    this.numCommits++;
    this.writeOutputs();
    this.graphEvaluator.asyncCommit(new NodeSocketRef(this.node.id, downstreamFlowSocketName));
  }

  // eslint-disable-next-line class-methods-use-this
  log(text: string) {
    Logger.verbose(`${this.graphEvaluator.graph.name}: ${this.node.typeName}:`);
    console.log(`[${new Date().toLocaleString()}] ${text}`);
  }
}
