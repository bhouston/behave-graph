import Debug from '../Debug';
import Graph from '../Graphs/Graph';
import GraphEvaluator from '../Graphs/GraphEvaluator';
import { SocketValueType } from '../Sockets/SocketValueType';
import Node from './Node';
import { NodeEvalStatus } from './NodeEvalStatus';
import NodeSocketRef from './NodeSocketRef';

// Purpose:
//  - Avoid nodes having to access globals to referene the scene or trigger loaders.
//  - Everything should be accessible via this context.
// Q: Should I store the promises in this structure?  Probably.
export default class NodeEvalContext {
  public evalStatus = NodeEvalStatus.None;
  public evalPromise : Promise<NodeEvalStatus> | undefined = undefined;
  public evalError : Error | undefined = undefined;
  public cachedInputValues = new Map<string, any>();
  public cachedOutputValues = new Map<string, any>();
  public numCommits = 0;
  public readonly graph: Graph;

  constructor(public readonly graphEvaluator: GraphEvaluator, public readonly node: Node) {
    this.graph = graphEvaluator.graph;
  }

  evalFlow(): NodeEvalStatus {
    // confirm assumptions for an immediate evaluation
    if (this.evalStatus !== NodeEvalStatus.None) {
      throw new Error(`can not evalFlow when context is in status ${this.evalStatus}`);
    }
    if (!this.node.isEvalNode) {
      throw new Error('can not use evalFlow on non-Flow nodes, use evalImmediate instead');
    }

    // read inputs all at once to avoid async inconsistencies.
    this.readInputs();

    try {
      this.node.func(this);
    } catch (e) {
      this.evalError = e as Error;
      this.evalStatus = NodeEvalStatus.Error;
      return this.evalStatus;
    }

    /* if (this.evalPromise !== undefined) {
      this.evalStatus = NodeEvalStatus.Async;
      return this.evalStatus;
    } */
    // confirm for now all execute is sync
    if (this.evalPromise !== undefined) {
      throw new Error('evalFlow can not yet handle evalPromise yet');
    }

    this.evalStatus = NodeEvalStatus.Done;
    this.writeOutputs();

    return this.evalStatus;
  }

  evalImmediate(): NodeEvalStatus {
    // confirm assumptions for an immediate evaluation
    if (this.evalStatus !== NodeEvalStatus.None) {
      throw new Error(`can not evalImmediate when context is in status ${this.evalStatus}`);
    }
    if (this.node.isEvalNode) {
      throw new Error('can not evalImmediate on Flow nodes, use evalFlow instead');
    }

    // read inputs all at once to avoid async inconsistencies.
    this.readInputs();

    try {
      this.node.func(this);
    } catch (e) {
      this.evalError = e as Error;
      this.evalStatus = NodeEvalStatus.Error;
      return this.evalStatus;
    }

    // confirm assumptions for immediate evaluation.
    if (this.evalPromise !== undefined) {
      throw new Error('evalImmediate can not handle evalPromise nodes, use evalFlow instead');
    }

    this.evalStatus = NodeEvalStatus.Done;
    this.writeOutputs();

    return this.evalStatus;
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
    if (outputSocket.valueType === SocketValueType.Flow) {
      throw new Error(`can not set the value of Flow output socket ${outputName}, use commit() instead`);
    }
    this.cachedOutputValues.set(outputName, value);
  }

  commit(downstreamFlowSocketName: string, onDownstreamCompleted: (()=> void) | undefined = undefined) {
    this.numCommits++;
    this.graphEvaluator.commit(new NodeSocketRef(this.graphEvaluator.graph.nodes.indexOf(this.node), downstreamFlowSocketName), onDownstreamCompleted);
  }

  // eslint-disable-next-line class-methods-use-this
  log(text: string) {
    Debug.log(`${this.graphEvaluator.graph.name}: ${this.node.nodeName}:`);
    console.log(text);
  }
}
