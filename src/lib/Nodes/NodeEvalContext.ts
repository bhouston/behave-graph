import Debug from '../Debug';
import GraphEvaluator from '../Graphs/Evaluation/GraphEvaluator';
import { NodeEvaluationType } from '../Graphs/Evaluation/NodeEvaluationType';
import { SyncEvaluationCompletedListener } from '../Graphs/Evaluation/SyncEvaluationCompletedListener';
import SyncExecutionBlock from '../Graphs/Evaluation/SyncExecutionBlock';
import Graph from '../Graphs/Graph';
import Variable from '../Variables/Variable';
import Node from './Node';
import NodeSocketRef from './NodeSocketRef';

// Purpose:
//  - Avoid nodes having to access globals to referene the scene or trigger loaders.
//  - Everything should be accessible via this context.
// Q: Should I store the promises in this structure?  Probably.
export default class NodeEvalContext {
  public async = false;
  public cachedInputValues = new Map<string, any>(); // TODO: figure out if this is really needed
  public cachedOutputValues = new Map<string, any>(); // TODO: figure out if this is really needed
  public numCommits = 0;
  public readonly graph: Graph;
  public readonly graphEvaluator: GraphEvaluator;

  constructor(public readonly syncExecutionBlock: SyncExecutionBlock, public readonly node: Node) {
    this.graphEvaluator = syncExecutionBlock.graphEvaluator;
    this.graph = this.graphEvaluator.graph;
  }

  beginAsync() {
    Debug.asset(this.async === false);
    this.graphEvaluator.asyncNodes.push(this.node);
    this.async = true;
    this.graphEvaluator.broadcastEvaluation(this.node, NodeEvaluationType.Flow, true);
  }

  endAsync() {
    Debug.asset(this.async === true);
    const index = this.graphEvaluator.asyncNodes.indexOf(this.node);
    this.graphEvaluator.asyncNodes.splice(index, 1);
    this.async = false;
    this.graphEvaluator.broadcastEvaluation(this.node, NodeEvaluationType.None, false);
  }

  evalFlow() {
    // confirm assumptions for an immediate evaluation
    Debug.asset(this.node.isEvalNode, 'can not use evalFlow on non-Flow nodes, use evalImmediate instead');

    this.graphEvaluator.broadcastEvaluation(this.node, NodeEvaluationType.Flow, false);

    // read inputs all at once to avoid async inconsistencies.
    this.readInputs();

    this.node.evalFunc(this);

    if (!this.async) {
      this.writeOutputs(); // TODO: replace this with commit(), no need for this overlapping duplicate codex
      this.graphEvaluator.broadcastEvaluation(this.node, NodeEvaluationType.None, false);
    }
  }

  evalImmediate() {
    // confirm assumptions for an immediate evaluation
    if (this.node.isEvalNode) {
      throw new Error('can not evalImmediate on Flow nodes, use evalFlow instead');
    }

    this.graphEvaluator.broadcastEvaluation(this.node, NodeEvaluationType.Immediate, false);

    // read inputs all at once to avoid async inconsistencies.
    this.readInputs();

    this.node.evalFunc(this);

    // confirm assumptions for immediate evaluation.
    Debug.asset(!this.async, 'evalImmediate can not handle evalPromise nodes, use evalFlow instead');

    this.writeOutputs();

    this.graphEvaluator.broadcastEvaluation(this.node, NodeEvaluationType.None, false);
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
  commit(downstreamFlowSocketName: string, syncEvaluationCompletedListener: SyncEvaluationCompletedListener | undefined = undefined) {
    Debug.logVerbose(`commit: nodeId ${this.node.id} and output socket name ${downstreamFlowSocketName}, and the node type is ${this.node.typeName}`);
    if (this.async) throw new Error('can not commit as currently in async mode, use asyncCommit instead.');
    this.numCommits++;
    this.writeOutputs();
    this.syncExecutionBlock.commit(new NodeSocketRef(this.node.id, downstreamFlowSocketName), syncEvaluationCompletedListener);
  }

  asyncCommit(downstreamFlowSocketName: string) {
    Debug.logVerbose(`asyncCommit: nodeId ${this.node.id} and output socket name ${downstreamFlowSocketName}, and the node type is ${this.node.typeName}`);
    if (!this.async) throw new Error('can not asyncCommit as not currently in async mode, use commit instead or set async mode enabled.');
    this.numCommits++;
    this.writeOutputs();
    this.graphEvaluator.asyncCommit(new NodeSocketRef(this.node.id, downstreamFlowSocketName));
  }

  // eslint-disable-next-line class-methods-use-this
  log(text: string) {
    Debug.logVerbose(`${this.graphEvaluator.graph.name}: ${this.node.typeName}:`);
    console.log(`[${new Date().toLocaleString()}] ${text}`);
  }
}
