import { IGraphApi } from '../Graphs/Graph';
import { NodeConfiguration } from './Node';
import { makeCommonProps } from './nodeFactory';
import {
  AsyncNodeInstance,
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
  label?: string;
}
export type SocketsMap = Record<string, SocketDefinition | string>;
export type SocketListDefinition = SocketDefinition & { key: string };
export type SocketsList = SocketListDefinition[];

export type SocketsGeneratorFromConfig = (
  nodeConfig: NodeConfiguration,
  graph: IGraphApi
) => SocketsList;

export type SocketsDefinition = SocketsMap | SocketsGeneratorFromConfig;

export type NodeFactory = (
  graph: IGraphApi,
  config: NodeConfiguration
) => INode;

export interface IHasNodeFactory {
  readonly nodeFactory: NodeFactory;
}

export interface INodeDefinitionBase<
  TInput extends SocketsDefinition = SocketsDefinition,
  TOutput extends SocketsDefinition = SocketsDefinition,
  TConfig extends NodeConfigurationDescription = NodeConfigurationDescription
> extends IHasNodeFactory {
  category?: NodeCategory;
  typeName: string;
  otherTypeNames?: string[];
  aliases?: string[]; // for backwards compatibility
  helpDescription?: string;
  label?: string;
  in: TInput;
  out: TOutput;
  configuration?: TConfig;
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

export type SocketNames<TSockets extends SocketsDefinition> =
  TSockets extends SocketsMap ? keyof TSockets : any;

export type TriggeredFn<
  TInput extends SocketsDefinition = SocketsDefinition,
  TOutput extends SocketsDefinition = SocketsDefinition,
  TState = any
> = (params: {
  // now read will only allow keys of the input types
  read<T>(inValueName: SocketNames<TInput>): T;
  // write and commit only allows keys from the output type
  write<T>(outValueName: SocketNames<TOutput>, value: T): void;
  commit(
    outFlowName: SocketNames<TOutput>,
    fiberCompletedListener?: () => void
  ): void; // commits to current fiber unless 'async-flow' or 'event-flow'
  outputSocketKeys: SocketNames<TOutput>[];
  triggeringSocketName: keyof TInput;
  // state of the node.
  state: TState;

  graph: IGraphApi;
  configuration: NodeConfiguration;
  finished?: () => void;
}) => TState;

/** Flow Node Definition */
export type TriggeredParams<
  TInput extends SocketsDefinition,
  TOutput extends SocketsDefinition,
  TState
> = Parameters<TriggeredFn<TInput, TOutput, TState>>[0];

export interface IHasInitialState<TState> {
  initialState: TState;
}

export interface IHasTriggered<
  TInput extends SocketsDefinition,
  TOutput extends SocketsDefinition,
  TState
> extends IHasInitialState<TState> {
  triggered: TriggeredFn<TInput, TOutput, TState>;
}
export type EventNodeSetupParams<
  TInput extends SocketsDefinition,
  TOutput extends SocketsDefinition,
  TState
> = Omit<TriggeredParams<TInput, TOutput, TState>, 'triggeringSocketName'>;

export interface IHasInit<
  TInput extends SocketsDefinition,
  TOutput extends SocketsDefinition,
  TState
> {
  init: (params: EventNodeSetupParams<TInput, TOutput, TState>) => void;
}

export interface IHasDispose<TState> {
  dispose: (params: { state: TState }) => void | TState;
}

export interface IFlowNodeDefinition<
  TInput extends SocketsDefinition = SocketsDefinition,
  TOutput extends SocketsDefinition = SocketsDefinition,
  TConfig extends NodeConfigurationDescription = NodeConfigurationDescription,
  TState = any
> extends INodeDefinition<TInput, TOutput, TConfig>,
    IHasInitialState<TState>,
    IHasTriggered<TInput, TOutput, TState> {}

// async node is the same as an event node, without the init function.
export interface IAsyncNodeDefinition<
  TInput extends SocketsDefinition = SocketsDefinition,
  TOutput extends SocketsDefinition = SocketsDefinition,
  TConfig extends NodeConfigurationDescription = NodeConfigurationDescription,
  TState = any
> extends INodeDefinition<TInput, TOutput, TConfig>,
    IHasInitialState<TState>,
    IHasTriggered<TInput, TOutput, TState>,
    IHasDispose<TState> {}

type OmitFactoryAndType<T extends INodeDefinitionBase> = Omit<
  T,
  'nodeFactory' | 'nodeType'
>;

export interface FunctionNodeExecParams<
  TInput extends SocketsDefinition,
  TOutput extends SocketsDefinition
> {
  // now read will only allow keys of the input types
  read<T>(inValueName: SocketNames<TInput>): T;
  // write and commit only allows keys from the output type
  write<T>(outValueName: SocketNames<TOutput>, value: T): void;

  graph: IGraphApi;
  configuration: NodeConfiguration;
}

export interface IFunctionNodeDefinition<
  TInput extends SocketsDefinition = SocketsDefinition,
  TOutput extends SocketsDefinition = SocketsDefinition,
  TConfig extends NodeConfigurationDescription = NodeConfigurationDescription
> extends INodeDefinition<TInput, TOutput, TConfig> {
  exec: (params: FunctionNodeExecParams<TInput, TOutput>) => void;
}

export interface IEventNodeDefinition<
  TInput extends SocketsDefinition = SocketsDefinition,
  TOutput extends SocketsDefinition = SocketsDefinition,
  TConfig extends NodeConfigurationDescription = NodeConfigurationDescription,
  TState = any
> extends INodeDefinition<TInput, TOutput, TConfig>,
    IHasInitialState<TState>,
    IHasInit<TInput, TOutput, TState>,
    IHasDispose<TState> {}

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
    nodeFactory: (graph, config) =>
      new FlowNodeInstance({
        ...makeCommonProps(NodeType.Flow, definition, config, graph),
        initialState: definition.initialState,
        triggered: definition.triggered
      })
  };
}

export function makeAsyncNodeDefinition<
  TInput extends SocketsDefinition,
  TOutput extends SocketsDefinition,
  TConfig extends NodeConfigurationDescription,
  TState
>(
  definition: OmitFactoryAndType<
    IAsyncNodeDefinition<TInput, TOutput, TConfig, TState>
  >
): IAsyncNodeDefinition<TInput, TOutput, TConfig, TState> {
  return {
    ...definition,
    nodeFactory: (graph, config) =>
      new AsyncNodeInstance({
        ...makeCommonProps(NodeType.Async, definition, config, graph),
        initialState: definition.initialState,
        triggered: definition.triggered,
        dispose: definition.dispose
      })
  };
}

// helper function to not require you to define generics when creating a node def,
// and generates a factory for a node instance
export function makeFunctionNodeDefinitionWithFactory<
  TInput extends SocketsDefinition,
  TOutput extends SocketsDefinition
>(definition: Omit<IFunctionNodeDefinition<TInput, TOutput>, 'exec'>) {
  return definition;
}

// helper function to not require you to define generics when creating a node def,
// and generates a factory for a node instance
export function makeFunctionNodeDefinition<
  TInput extends SocketsDefinition,
  TOutput extends SocketsDefinition
>(
  definition: OmitFactoryAndType<IFunctionNodeDefinition<TInput, TOutput>>
): IFunctionNodeDefinition<TInput, TOutput> {
  return {
    ...definition,
    nodeFactory: (graph, nodeConfig) =>
      new FunctionNodeInstance({
        ...makeCommonProps(NodeType.Function, definition, nodeConfig, graph),
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
    IEventNodeDefinition<TInput, TOutput, TConfig, TState>
  >
): IEventNodeDefinition<TInput, TOutput, TConfig, TState> {
  return {
    ...definition,
    nodeFactory: (graph, config) =>
      new EventNodeInstance({
        ...makeCommonProps(NodeType.Event, definition, config, graph),
        initialState: definition.initialState,
        init: definition.init,
        dispose: definition.dispose
      })
  };
}

export { NodeCategory } from './Registry/NodeCategory';
