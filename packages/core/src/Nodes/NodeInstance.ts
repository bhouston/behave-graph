import { Engine } from '../Execution/Engine';
import { Fiber } from '../Execution/Fiber';
import { IGraph } from '../Graphs/Graph';
import { Socket } from '../Sockets/Socket';
import { NodeConfiguration } from './Node';
import {
  IAsyncNodeDefinition,
  IEventNodeDefinition,
  IFlowNodeDefinition,
  IFunctionNodeDefinition
} from './NodeDefinition';
import { readInputFromSockets, writeOutputsToSocket } from './NodeSockets';

export enum NodeType {
  Event = 'Event',
  Flow = 'Flow',
  Async = 'Async',
  Function = 'Function'
}

export interface INode {
  readonly id: string;
  readonly inputs: Socket[];
  readonly outputs: Socket[];
  readonly graph: IGraph;
  typeName: string;
  nodeType: NodeType;
  configuration: NodeConfiguration;
}

export interface IEventNode extends INode {
  nodeType: NodeType.Event;
  init: (engine: Engine) => void;
  dispose: (engine: Engine) => void;
}

export interface IFlowNode extends INode {
  nodeType: NodeType.Flow;
  triggered: (fiber: Fiber, triggeringSocketName: string) => void;
}

export interface IAsyncNode extends INode {
  nodeType: NodeType.Async;
  triggered: (
    engine: Engine,
    triggeringSocketName: string,
    finished: () => void
  ) => void;
  dispose: () => void;
}

export interface IFunctionNode extends INode {
  nodeType: NodeType.Function;
  exec: (node: INode) => void;
}

export const isFlowNode = (node: INode): node is IFlowNode =>
  node.nodeType === NodeType.Flow;

export const isEventNode = (node: INode): node is IEventNode =>
  node.nodeType === NodeType.Event;

export const isAsyncNode = (node: INode): node is IAsyncNode =>
  node.nodeType === NodeType.Async;

export const isFunctionNode = (node: INode): node is IFunctionNode =>
  node.nodeType === NodeType.Function;

export const makeNodeInstance = (node: INode) => {
  const readInput = <T>(inputName: string): T => {
    return readInputFromSockets(node.inputs, inputName, node.typeName);
  };

  const writeOutput = <T>(outputName: string, value: T) => {
    writeOutputsToSocket(node.outputs, outputName, value, node.typeName);
  };

  return {
    ...node,
    readInput,
    writeOutput
  };
};

abstract class NodeInstance<TNodeType extends NodeType> implements INode {
  public readonly id: string;
  public readonly inputs: Socket[];
  public readonly outputs: Socket[];
  public typeName: string;
  public nodeType: TNodeType;
  public graph: IGraph;
  public configuration: NodeConfiguration;

  constructor(node: Omit<INode, 'nodeType'> & { nodeType: TNodeType }) {
    this.id = node.id;
    this.inputs = node.inputs;
    this.outputs = node.outputs;
    this.typeName = node.typeName;
    this.nodeType = node.nodeType;
    this.graph = node.graph;
    this.configuration = node.configuration;
  }

  readInput<T>(inputName: string): T {
    return readInputFromSockets(this.inputs, inputName, this.typeName);
  }

  writeOutput<T>(outputName: string, value: T) {
    writeOutputsToSocket(this.outputs, outputName, value, this.typeName);
  }
}

export class FlowNodeInstance<TFlowNodeDefinition extends IFlowNodeDefinition>
  extends NodeInstance<NodeType.Flow>
  implements IFlowNode
{
  private triggeredInner: TFlowNodeDefinition['triggered'];
  private state: TFlowNodeDefinition['initialState'];
  private readonly outputSocketKeys: string[];

  constructor(
    nodeProps: Omit<INode, 'nodeType'> &
      Pick<TFlowNodeDefinition, 'triggered' | 'initialState'>
  ) {
    super({ ...nodeProps, nodeType: NodeType.Flow });
    this.triggeredInner = nodeProps.triggered;
    this.state = nodeProps.initialState;
    this.outputSocketKeys = nodeProps.outputs.map((s) => s.name);
  }

  public triggered(fiber: Fiber, triggeringSocketName: string) {
    this.state = this.triggeredInner({
      commit: (outFlowName, fiberCompletedListener) =>
        fiber.commit(this, outFlowName, fiberCompletedListener),
      read: this.readInput,
      write: this.writeOutput,
      state: this.state,
      outputSocketKeys: this.outputSocketKeys,
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      triggeringSocketName
    });
  }
}

export class AsyncNodeInstance<TAsyncNodeDef extends IAsyncNodeDefinition>
  extends NodeInstance<NodeType.Async>
  implements IAsyncNode
{
  private triggeredInner: TAsyncNodeDef['triggered'];
  private disposeInner: TAsyncNodeDef['dispose'];
  private state: TAsyncNodeDef['initialState'];

  constructor(
    node: Omit<INode, 'nodeType'> &
      Pick<TAsyncNodeDef, 'triggered' | 'initialState' | 'dispose'>
  ) {
    super({ ...node, nodeType: NodeType.Async });

    this.triggeredInner = node.triggered;
    this.disposeInner = node.dispose;
    this.state = node.initialState;
  }

  triggered = (
    engine: Pick<Engine, 'commitToNewFiber'>,
    triggeringSocketName: string,
    finished: () => void
  ) => {
    this.triggeredInner({
      read: this.readInput,
      write: this.writeOutput,
      commit: (outFlowname, fiberCompletedListener) =>
        engine.commitToNewFiber(this, outFlowname, fiberCompletedListener),
      configuration: this.configuration,
      graph: this.graph,
      finished,
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      triggeringSocketName
    });
  };
  dispose = () => {
    this.state = this.disposeInner({ state: this.state });
  };
}

export class EventNodeInstance<TEventNodeDef extends IEventNodeDefinition>
  extends NodeInstance<NodeType.Event>
  implements IEventNode
{
  private initInner: TEventNodeDef['init'];
  private disposeInner: TEventNodeDef['dispose'];
  private state: TEventNodeDef['initialState'];
  private readonly outputSocketKeys: string[];

  constructor(
    nodeProps: Omit<INode, 'nodeType'> &
      Pick<TEventNodeDef, 'init' | 'dispose' | 'initialState'>
  ) {
    super({ ...nodeProps, nodeType: NodeType.Event });
    this.initInner = nodeProps.init;
    this.disposeInner = nodeProps.dispose;
    this.state = nodeProps.initialState;
    this.outputSocketKeys = nodeProps.outputs.map((s) => s.name);
  }

  init(engine: Engine): any {
    this.state = this.initInner({
      read: this.readInput,
      write: this.writeOutput,
      state: this.state,
      outputSocketKeys: this.outputSocketKeys,
      commit: (outFlowname, fiberCompletedListener) =>
        engine.commitToNewFiber(this, outFlowname, fiberCompletedListener),
      configuration: this.configuration,
      graph: this.graph
    });
  }

  dispose(): void {
    this.disposeInner({
      state: this.state
    });
  }
}

export class FunctionNodeInstance<
    TFunctionNodeDef extends IFunctionNodeDefinition
  >
  extends NodeInstance<NodeType.Function>
  implements IFunctionNode
{
  private execInner: TFunctionNodeDef['exec'];
  constructor(
    nodeProps: Omit<INode, 'nodeType'> & Pick<TFunctionNodeDef, 'exec'>
  ) {
    super({ ...nodeProps, nodeType: NodeType.Function });

    this.execInner = nodeProps.exec;
  }

  exec(node: INode) {
    this.execInner({
      read: (name) => readInputFromSockets(node.inputs, name, node.typeName),
      write: (name, value) =>
        writeOutputsToSocket(node.outputs, name, value, node.typeName),
      configuration: this.configuration,
      graph: this.graph
    });
  }
}
