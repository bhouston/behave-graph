export type SocketsDefinition = Record<string, string>;

export interface NodeAPI<
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
    fiberCompletedListener: (() => void) | undefined
  ): void; // commits to current fiber unless 'async-flow' or 'event-flow'
  triggeringSocketName: keyof TInput;
  // state of the node.
  state: TState;
}

type NodeType = 'function' | 'async-flow' | 'flow' | 'event-flow';

// not even sure this is needed, seems very arbitrary
export type NodeCategory =
  | 'action'
  | 'query'
  | 'logic'
  | 'event'
  | 'variable'
  | 'flow'
  | 'time'
  | 'none';

export type NodeExec<
  TInput extends SocketsDefinition,
  TOutput extends SocketsDefinition,
  TState
> = (api: NodeAPI<TInput, TOutput, TState>) => TState;

export type NodeDefinition<
  TInput extends SocketsDefinition,
  TOutput extends SocketsDefinition,
  TState
> = {
  name: string;
  type: NodeType;
  aliases?: string[]; // for backwards compatibility
  category?: NodeCategory;
  description?: string;
  in: TInput;
  out: TOutput;
  initialState: TState;
  exec: NodeExec<TInput, TOutput, TState>;
};

// helper function to not require you to define generics when creating a node def:
export function makeNodeDefinition<
  TInput extends SocketsDefinition,
  TOutput extends SocketsDefinition,
  TState
>(
  definition: NodeDefinition<TInput, TOutput, TState>
): NodeDefinition<TInput, TOutput, TState> {
  return definition;
}
