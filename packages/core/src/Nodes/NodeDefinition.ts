import { makeCommonProps } from './nodeFactory';
import {
  EventNodeInstance,
  FlowNodeInstance,
  FunctionNodeInstance,
  INode
} from './NodeInstance';
import { NodeCategory } from './Registry/NodeCategory';

export interface SocketDefinition {
  valueType: string;
  defaultValue?: any;
  choices?: string[];
}

export type SocketsDefinition = Record<string, SocketDefinition | string>;

export interface INodeDefinitionBase<
  TInput extends SocketsDefinition = SocketsDefinition,
  TOutput extends SocketsDefinition = SocketsDefinition
> {
  category: NodeCategory;
  typeName: string;
  otherTypeNames?: string[];
  // type: NodeType;
  aliases?: string[]; // for backwards compatibility
  helpDescription?: string;
  label?: string;
  in: TInput;
  out: TOutput;
  factory: (nodeId: string) => INode;
}

export interface INodeDefinition<
  TInput extends SocketsDefinition,
  TOutput extends SocketsDefinition,
  TNodeCategory extends NodeCategory
> extends INodeDefinitionBase<TInput, TOutput> {
  category: TNodeCategory;
  typeName: string;
  // type: NodeType;
  aliases?: string[]; // for backwards compatibility
  helpDescription?: string;
  label?: string;
  in: TInput;
  out: TOutput;
}

/** Flow Node Definition */
export interface FlowNodeTriggeredParams<
  TInput extends SocketsDefinition,
  TOutput extends SocketsDefinition,
  TState
> {
  // now read will only allow keys of the input types
  read<T>(inValueName: keyof TInput): T;
  // write and commit only allows keys from the output type
  write<T>(outValueName: keyof TOutput, value: T): void;
  commit(
    outFlowName: keyof TOutput,
    fiberCompletedListener?: () => void
    // fiberCompletedListener: (() => void) | undefined
  ): void; // commits to current fiber unless 'async-flow' or 'event-flow'
  outputSocketKeys: (keyof TOutput)[];
  triggeringSocketName: keyof TInput;
  // state of the node.
  state: TState;
}

export type FlowNodeTriggeredFn<
  TInput extends SocketsDefinition = SocketsDefinition,
  TOutput extends SocketsDefinition = SocketsDefinition,
  TState = any
> = (params: FlowNodeTriggeredParams<TInput, TOutput, TState>) => TState;

export interface IFlowNodeDefinition<
  TInput extends SocketsDefinition = SocketsDefinition,
  TOutput extends SocketsDefinition = SocketsDefinition,
  TState = any
> extends INodeDefinition<TInput, TOutput, NodeCategory.Flow> {
  initialState: TState;
  triggered: FlowNodeTriggeredFn<TInput, TOutput, TState>;
}

export interface FunctionNodeExecParams<
  TInput extends SocketsDefinition,
  TOutput extends SocketsDefinition
> {
  // now read will only allow keys of the input types
  read<T>(inValueName: keyof TInput): T;
  // write and commit only allows keys from the output type
  write<T>(outValueName: keyof TOutput, value: T): void;
}

export interface FunctionNodeDefinition<
  TInput extends SocketsDefinition = SocketsDefinition,
  TOutput extends SocketsDefinition = SocketsDefinition
> extends INodeDefinition<TInput, TOutput, NodeCategory.Function> {
  exec: (params: FunctionNodeExecParams<TInput, TOutput>) => void;
}

export type EventNodeSetupParams<
  TInput extends SocketsDefinition,
  TOutput extends SocketsDefinition,
  TState
> = Omit<
  FlowNodeTriggeredParams<TInput, TOutput, TState>,
  'triggeringSocketName'
>;

export interface EventNodeDefinition<
  TInput extends SocketsDefinition = SocketsDefinition,
  TOutput extends SocketsDefinition = SocketsDefinition,
  TState = any
> extends INodeDefinition<TInput, TOutput, NodeCategory.Event> {
  initialState: TState;
  init: (params: EventNodeSetupParams<TInput, TOutput, TState>) => void;
  dispose: (params: { state: TState }) => void;
}

type OmitFactory<T> = Omit<T, 'factory'>;

// HELPER FUNCTIONS

// helper function to not require you to define generics when creating a node def:
export function makeFlowNodeDefinition<
  TInput extends SocketsDefinition,
  TOutput extends SocketsDefinition,
  TState
>(
  definition: OmitFactory<IFlowNodeDefinition<TInput, TOutput, TState>>
): IFlowNodeDefinition<TInput, TOutput, TState> {
  return {
    ...definition,
    factory: (id: string) =>
      new FlowNodeInstance({
        ...makeCommonProps(id, definition),
        initialState: definition.initialState,
        triggered: definition.triggered
      })
  };
}

// helper function to not require you to define generics when creating a node def,
// and generates a factory for a node instance
export function makeFunctionNodeDefinition<
  TInput extends SocketsDefinition,
  TOutput extends SocketsDefinition
>(
  definition: OmitFactory<FunctionNodeDefinition<TInput, TOutput>>
): FunctionNodeDefinition<TInput, TOutput> {
  return {
    ...definition,
    factory: (id: string) =>
      new FunctionNodeInstance({
        ...makeCommonProps(id, definition),
        exec: definition.exec
      })
  };
}

export function makeEventNodeDefinition<
  TInput extends SocketsDefinition,
  TOutput extends SocketsDefinition,
  TState
>(
  definition: OmitFactory<EventNodeDefinition<TInput, TOutput, TState>>
): EventNodeDefinition<TInput, TOutput, TState> {
  return {
    ...definition,
    factory: (id: string) =>
      new EventNodeInstance({
        ...makeCommonProps(id, definition),
        initialState: definition.initialState,
        init: definition.init,
        dispose: definition.dispose
      })
  };
}

export { NodeCategory } from './Registry/NodeCategory';
