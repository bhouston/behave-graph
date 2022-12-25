export type SocketsDefinition = Record<string, string>;
// not even sure this is needed, seems very arbitrary
export type NodeCategory =
  | 'action'
  | 'query'
  | 'logic'
  | 'Event'
  | 'variable'
  | 'Flow'
  | 'Function'
  | 'none';

export interface NodeDefinition<
  TInput extends SocketsDefinition,
  TOutput extends SocketsDefinition
> {
  typeName: string;
  category?: NodeCategory;
  // type: NodeType;
  aliases?: string[]; // for backwards compatibility
  helpDescription?: string;
  label?: string;
  in: TInput;
  out: TOutput;
  initialInputs?: { [key in keyof TInput]?: any };
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
    outFlowName: keyof TOutput
    // fiberCompletedListener: (() => void) | undefined
  ): void; // commits to current fiber unless 'async-flow' or 'event-flow'
  triggeringSocketName: keyof TInput;
  // state of the node.
  state: TState;
}

export interface FlowNodeDefinition<
  TInput extends SocketsDefinition,
  TOutput extends SocketsDefinition,
  TState
> extends NodeDefinition<TInput, TOutput> {
  initialState: TState;
  triggered: (
    params: FlowNodeTriggeredParams<TInput, TOutput, TState>
  ) => TState;
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
  TInput extends SocketsDefinition,
  TOutput extends SocketsDefinition
> extends NodeDefinition<TInput, TOutput> {
  exec: (params: FunctionNodeExecParams<TInput, TOutput>) => void;
}

export interface EventNodeDefinition<
  TInput extends SocketsDefinition,
  TOutput extends SocketsDefinition,
  TState
> extends NodeDefinition<TInput, TOutput> {
  initialState: TState;
  init: (params: FlowNodeTriggeredParams<TInput, TOutput, TState>) => TState;
  dispose: (params: FlowNodeTriggeredParams<TInput, TOutput, TState>) => void;
}

// HELPER FUNCTIONS

// helper function to not require you to define generics when creating a node def:
export function makeFlowNodeDefinition<
  TInput extends SocketsDefinition,
  TOutput extends SocketsDefinition,
  TState
>(
  definition: FlowNodeDefinition<TInput, TOutput, TState>
): FlowNodeDefinition<TInput, TOutput, TState> {
  return definition;
}

// helper function to not require you to define generics when creating a node def:
export function makeFunctionNodeDefinition<
  TInput extends SocketsDefinition,
  TOutput extends SocketsDefinition
>(
  definition: FunctionNodeDefinition<TInput, TOutput>
): FunctionNodeDefinition<TInput, TOutput> {
  return definition;
}

export function makeEventNodeDefinition<
  TInput extends SocketsDefinition,
  TOutput extends SocketsDefinition,
  TState
>(
  definition: EventNodeDefinition<TInput, TOutput, TState>
): EventNodeDefinition<TInput, TOutput, TState> {
  return definition;
}
