import { Engine } from '../Execution/Engine';
import { Fiber } from '../Execution/Fiber';
import { Socket } from '../Sockets/Socket';
import {
  EventNodeDefinition,
  FlowNodeTriggeredFn,
  NodeCategory
} from './NodeDefinition';
import { readInputFromSockets, writeOutputsToSocket } from './NodeSockets';

export interface INode {
  readonly id: string;
  readonly inputs: Socket[];
  readonly outputs: Socket[];
  typeName: string;
  category: NodeCategory;
}

export interface IEventNode extends INode {
  category: NodeCategory.Event;
  init: (engine: Engine) => void;
  dispose: (engine: Engine) => void;
}

export interface IFlowNode extends INode {
  category: NodeCategory.Flow;
  triggered: (fiber: Fiber, triggeringSocketName: string) => void;
}

export interface IAsyncNode extends INode {
  category: NodeCategory.Async;
  triggered: (
    engine: Engine,
    triggeringSocketName: string,
    finished: () => void
  ) => void;
  dispose: () => void;
}

export const isFlowNode = (node: INode): node is IFlowNode =>
  node.category === NodeCategory.Flow;

export const isEventNode = (node: INode): node is IEventNode =>
  node.category === NodeCategory.Event;

export const isAsyncNode = (node: INode): node is IAsyncNode =>
  node.category === NodeCategory.Async;

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

abstract class NodeInstance<TNodeCategory extends NodeCategory>
  implements INode
{
  public readonly id: string;
  public readonly inputs: Socket[];
  public readonly outputs: Socket[];
  public typeName: string;
  public category: TNodeCategory;

  constructor(node: Omit<INode, 'category'> & { category: TNodeCategory }) {
    this.id = node.id;
    this.inputs = node.inputs;
    this.outputs = node.outputs;
    this.typeName = node.typeName;
    this.category = node.category;
  }

  readInput<T>(inputName: string): T {
    return readInputFromSockets(this.inputs, inputName, this.typeName);
  }

  writeOutput<T>(outputName: string, value: T) {
    writeOutputsToSocket(this.outputs, outputName, value, this.typeName);
  }
}

export class FlowNodeInstance
  extends NodeInstance<NodeCategory.Flow>
  implements IFlowNode
{
  private triggeredInner: FlowNodeTriggeredFn;
  private state: any;
  constructor(
    nodeProps: Omit<INode, 'category'> & {
      triggered: FlowNodeTriggeredFn;
      initialState: any;
    }
  ) {
    super({ ...nodeProps, category: NodeCategory.Flow });
    this.triggeredInner = nodeProps.triggered;
    this.state = nodeProps.initialState;
  }

  public triggered(fiber: Fiber, triggeringSocketName: string) {
    this.state = this.triggeredInner({
      commit: (outFlowname, fiberCompletedListener) =>
        fiber.commit(this, outFlowname, fiberCompletedListener),
      read: this.readInput,
      write: this.writeOutput,
      state: this.state,
      triggeringSocketName
    });
  }
}

export class EventNodeInstance
  extends NodeInstance<NodeCategory.Event>
  implements IEventNode
{
  private initInner: EventNodeDefinition['init'];
  private disposeInner: EventNodeDefinition['dispose'];
  private state: EventNodeDefinition['initialState'];

  constructor(
    nodeProps: Omit<INode, 'category'> &
      Pick<EventNodeDefinition, 'init' | 'dispose' | 'initialState'>
  ) {
    super({ ...nodeProps, category: NodeCategory.Event });
    this.initInner = nodeProps.init;
    this.disposeInner = nodeProps.dispose;
    this.state = nodeProps.initialState;
  }

  init(engine: Engine): any {
    this.state = this.initInner({
      read: this.readInput,
      write: this.writeOutput,
      state: this.state,
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

export class AsyncNodeInstance
  extends NodeInstance<NodeCategory.Async>
  implements IAsyncNode
{
  constructor(
    nodeProps: Omit<INode, 'category'> & Pick<Asyn
  ) {
    super({ ...nodeProps, category: NodeCategory.Async });
  }

  triggered(
    engine: Engine,
    triggeringSocketName: string,
    finished: () => void
  ) {}

  dispose() {}
}
