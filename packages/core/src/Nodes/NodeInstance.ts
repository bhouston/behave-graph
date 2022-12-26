import { Engine } from '../Execution/Engine';
import { Fiber } from '../Execution/Fiber';
import { Socket } from '../Sockets/Socket';
import {
  EventNodeDefinition,
  FlowNodeTriggeredFn,
  FunctionNodeDefinition
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
  typeName: string;
  nodeType: NodeType;
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

  constructor(node: Omit<INode, 'nodeType'> & { nodeType: TNodeType }) {
    this.id = node.id;
    this.inputs = node.inputs;
    this.outputs = node.outputs;
    this.typeName = node.typeName;
    this.nodeType = node.nodeType;
  }

  readInput<T>(inputName: string): T {
    return readInputFromSockets(this.inputs, inputName, this.typeName);
  }

  writeOutput<T>(outputName: string, value: T) {
    writeOutputsToSocket(this.outputs, outputName, value, this.typeName);
  }
}

export class FlowNodeInstance
  extends NodeInstance<NodeType.Flow>
  implements IFlowNode
{
  private triggeredInner: FlowNodeTriggeredFn;
  private state: any;
  private readonly outputSocketKeys: string[];

  constructor(
    nodeProps: Omit<INode, 'nodeType'> & {
      triggered: FlowNodeTriggeredFn;
      initialState: any;
    }
  ) {
    super({ ...nodeProps, nodeType: NodeType.Flow });
    this.triggeredInner = nodeProps.triggered;
    this.state = nodeProps.initialState;
    this.outputSocketKeys = nodeProps.outputs.map((s) => s.name);
  }

  public triggered(fiber: Fiber, triggeringSocketName: string) {
    this.state = this.triggeredInner({
      commit: (outFlowname, fiberCompletedListener) =>
        fiber.commit(this, outFlowname, fiberCompletedListener),
      read: this.readInput,
      write: this.writeOutput,
      state: this.state,
      outputSocketKeys: this.outputSocketKeys,
      triggeringSocketName
    });
  }
}

export class EventNodeInstance
  extends NodeInstance<NodeType.Event>
  implements IEventNode
{
  private initInner: EventNodeDefinition['init'];
  private disposeInner: EventNodeDefinition['dispose'];
  private state: EventNodeDefinition['initialState'];
  private readonly outputSocketKeys: string[];

  constructor(
    nodeProps: Omit<INode, 'nodeType'> &
      Pick<EventNodeDefinition, 'init' | 'dispose' | 'initialState'>
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
        engine.commitToNewFiber(this, outFlowname, fiberCompletedListener)
    });
  }

  dispose(): void {
    this.disposeInner({
      state: this.state
    });
  }
}

export class FunctionNodeInstance
  extends NodeInstance<NodeType.Function>
  implements IFunctionNode
{
  private execInner: FunctionNodeDefinition['exec'];
  constructor(
    nodeProps: Omit<INode, 'nodeType'> & Pick<FunctionNodeDefinition, 'exec'>
  ) {
    super({ ...nodeProps, nodeType: NodeType.Function });

    this.execInner = nodeProps.exec;
  }

  exec(node: INode) {
    this.execInner({
      read: (name) => readInputFromSockets(node.inputs, name, node.typeName),
      write: (name, value) =>
        writeOutputsToSocket(node.outputs, name, value, node.typeName)
    });
  }
}
