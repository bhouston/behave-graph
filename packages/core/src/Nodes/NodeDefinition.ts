import { IGraph } from '../Graphs/Graph';
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
  label?: string;
}
export type SocketsMap = Record<string, SocketDefinition | string>;
export type SocketsList = (SocketDefinition & { key: string })[];

export type SocketsGeneratorFromConfig = (
  nodeConfig: NodeConfiguration,
  graph: IGraph
) => SocketsList;

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
  factory: (
    nodeId: string,
    nodeConfig: NodeConfiguration,
    graph: IGraph
  ) => INode;
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

/** Flow Node Definition */
export interface FlowNodeTriggeredParams<
  TInput extends SocketsDefinition,
  TOutput extends SocketsDefinition,
  TState
> {
  // now read will only allow keys of the input types
  read<T>(inValueName: SocketNames<TInput>): T;
  // write and commit only allows keys from the output type
  write<T>(outValueName: SocketNames<TOutput>, value: T): void;
  commit(
    outFlowName: SocketNames<TOutput>,
    fiberCompletedListener?: () => void
    // fiberCompletedListener: (() => void) | undefined
  ): void; // commits to current fiber unless 'async-flow' or 'event-flow'
  outputSocketKeys: SocketNames<TOutput>[];
  triggeringSocketName: keyof TInput;
  // state of the node.
  state: TState;

  graph: IGraph;
  configuration: NodeConfiguration;
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
  read<T>(inValueName: SocketNames<TInput>): T;
  // write and commit only allows keys from the output type
  write<T>(outValueName: SocketNames<TOutput>, value: T): void;

  graph: IGraph;
  configuration: NodeConfiguration;
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

const flowNodeFactory = (
  definition: OmitFactoryAndType<IFlowNodeDefinition>,
  id: string,
  nodeConfig: NodeConfiguration,
  graph: IGraph
): INode =>
  new FlowNodeInstance({
    ...makeCommonProps(
      id,
      NodeType.Flow,
      {
        typeName: definition.typeName,
        in: definition.in,
        out: definition.out
      },
      nodeConfig,
      graph
    ),
    initialState: definition.initialState,
    triggered: definition.triggered
  });

// helper function to not require you to define generics when creating a node def:
export function makeFlowNodeDefinition<
  TInput extends SocketsDefinition,
  TOutput extends SocketsDefinition,
  TConfig extends NodeConfigurationDescription,
  TState
>(
  definition: OmitFactoryAndType<
    IFlowNodeDefinition<TInput, TOutput, TConfig, TState>
  > & {
    factory?: typeof flowNodeFactory;
  }
): IFlowNodeDefinition<TInput, TOutput, TConfig, TState> {
  const { factory = flowNodeFactory } = definition;
  return {
    ...definition,
    factory: (id, nodeConfig, graph) =>
      factory(definition, id, nodeConfig, graph)
  };
}

// helper function to not require you to define generics when creating a node def,
// and generates a factory for a node instance
export function makeFunctionNodeDefinitionWithFactory<
  TInput extends SocketsDefinition,
  TOutput extends SocketsDefinition
>(definition: Omit<FunctionNodeDefinition<TInput, TOutput>, 'exec'>) {
  return definition;
}

const functionNodeFactory = (
  definition: OmitFactoryAndType<FunctionNodeDefinition>,
  id: string,
  nodeConfig: NodeConfiguration,
  graph: IGraph
): INode =>
  new FunctionNodeInstance({
    ...makeCommonProps(id, NodeType.Function, definition, nodeConfig, graph),
    exec: definition.exec
  });

// helper function to not require you to define generics when creating a node def,
// and generates a factory for a node instance
export function makeFunctionNodeDefinition<
  TInput extends SocketsDefinition,
  TOutput extends SocketsDefinition
>(
  definition: OmitFactoryAndType<FunctionNodeDefinition<TInput, TOutput>> & {
    factory?: typeof functionNodeFactory;
  }
): FunctionNodeDefinition<TInput, TOutput> {
  const { factory = functionNodeFactory } = definition;
  return {
    ...definition,
    factory: (id, nodeConfig, graph) =>
      factory(definition, id, nodeConfig, graph)
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
    factory: (id, nodeConfig, graph) =>
      new EventNodeInstance({
        ...makeCommonProps(id, NodeType.Event, definition, nodeConfig, graph),
        initialState: definition.initialState,
        init: definition.init,
        dispose: definition.dispose
      })
  };
}

export { NodeCategory } from './Registry/NodeCategory';
