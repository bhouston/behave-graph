import { NodeConfiguration } from './Node';
import { makeCommonProps } from './nodeFactory';
import {
  EventNodeInstance,
  FlowNodeInstance,
  FunctionNodeInstance,
  INode,
  NodeType
} from './NodeInstance';
import { NodeCategory } from './Registry/NodeCategory';
import { NodeConfigurationDescription } from './Registry/NodeDescription';

export interface SocketDefinition {
  valueType: string;
  defaultValue?: any;
  choices?: string[];
}
export type SocketsMap = Record<string, SocketDefinition | string>;

export type SocketsGeneratorFromConfig = (nodeConfig: NodeConfiguration) => {
  sockets: SocketsMap;
  keys: string[];
};

export type SocketsDefinition = SocketsMap | SocketsGeneratorFromConfig;

export interface INodeDefinitionBase<
  TInput extends SocketsDefinition = SocketsDefinition,
  TOutput extends SocketsDefinition = SocketsDefinition,
  TConfig extends NodeConfigurationDescription = NodeConfigurationDescription
> {
  category?: NodeCategory;
  typeName: string;
  otherTypeNames?: string[];
  aliases?: string[]; // for backwards compatibility
  helpDescription?: string;
  label?: string;
  in: TInput;
  out: TOutput;
  configuration?: TConfig;
  factory: (nodeId: string, nodeConfig: NodeConfiguration) => INode;
}

export interface INodeDefinition<
  TInput extends SocketsDefinition,
  TOutput extends SocketsDefinition,
  TConfig extends NodeConfigurationDescription
> extends INodeDefinitionBase<TInput, TOutput, TConfig> {
  in: TInput;
  out: TOutput;
  configuration?: TConfig;
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
  TConfig extends NodeConfigurationDescription = NodeConfigurationDescription,
  TState = any
> extends INodeDefinition<TInput, TOutput, TConfig> {
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
  TOutput extends SocketsDefinition = SocketsDefinition,
  TConfig extends NodeConfigurationDescription = NodeConfigurationDescription
> extends INodeDefinition<TInput, TOutput, TConfig> {
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
  TConfig extends NodeConfigurationDescription = NodeConfigurationDescription,
  TState = any
> extends INodeDefinition<TInput, TOutput, TConfig> {
  initialState: TState;
  init: (params: EventNodeSetupParams<TInput, TOutput, TState>) => void;
  dispose: (params: { state: TState }) => void;
}

type OmitFactoryAndType<T extends INodeDefinitionBase> = Omit<
  T,
  'factory' | 'nodeType'
>;

// HELPER FUNCTIONS

// helper function to not require you to define generics when creating a node def:
export function makeFlowNodeDefinition<
  TInput extends SocketsDefinition,
  TOutput extends SocketsDefinition,
  TConfig extends NodeConfigurationDescription,
  TState
>(
  definition: OmitFactoryAndType<
    IFlowNodeDefinition<TInput, TOutput, TConfig, TState>
  >
): IFlowNodeDefinition<TInput, TOutput, TConfig, TState> {
  return {
    ...definition,
    factory: (id: string, nodeConfig: NodeConfiguration) =>
      new FlowNodeInstance({
        ...makeCommonProps(id, NodeType.Flow, definition, nodeConfig),
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
  definition: OmitFactoryAndType<FunctionNodeDefinition<TInput, TOutput>>
): FunctionNodeDefinition<TInput, TOutput> {
  return {
    ...definition,
    factory: (id: string, nodeConfig: NodeConfiguration) =>
      new FunctionNodeInstance({
        ...makeCommonProps(id, NodeType.Function, definition, nodeConfig),
        exec: definition.exec
      })
  };
}

export function makeEventNodeDefinition<
  TInput extends SocketsDefinition,
  TOutput extends SocketsDefinition,
  TConfig extends NodeConfigurationDescription,
  TState
>(
  definition: OmitFactoryAndType<
    EventNodeDefinition<TInput, TOutput, TConfig, TState>
  >
): EventNodeDefinition<TInput, TOutput, TConfig, TState> {
  return {
    ...definition,
    factory: (id: string, nodeConfig: NodeConfiguration) =>
      new EventNodeInstance({
        ...makeCommonProps(id, NodeType.Event, definition, nodeConfig),
        initialState: definition.initialState,
        init: definition.init,
        dispose: definition.dispose
      })
  };
}

export { NodeCategory } from './Registry/NodeCategory';
