import { Graph, IGraphApi } from '../Graphs/Graph';
import { registerCoreValueTypes } from '../Profiles/Core/registerCoreProfile';
import { Registry } from '../Registry';
import { NodeConfiguration } from './Node';
import {
  IFunctionNodeDefinition,
  IHasTriggered,
  SocketNames,
  SocketsDefinition
} from './NodeDefinition';
import { makeOrGenerateSockets } from './nodeFactory';
import { NodeConfigurationDescription } from './Registry/NodeDescription';

const makeEmptyGraph = (): IGraphApi => {
  const registry = new Registry();
  registerCoreValueTypes(registry.values);
  return new Graph(registry).makeApi();
};

export type SocketValues<TSockets extends SocketsDefinition> = {
  [key in SocketNames<TSockets>]?: any;
};

/** Helper function to test an function node's exec and get the resulting outputs.
 * Can simulate the input socket values. Returns the output socket values
 */
export const testExec = <
  TInput extends SocketsDefinition,
  TOutput extends SocketsDefinition,
  TConfig extends NodeConfigurationDescription
>({
  nodeInputVals = {},
  configuration = {},
  exec,
  makeGraph = makeEmptyGraph
}: {
  /** Exec function from the node defintion */
  exec: IFunctionNodeDefinition<TInput, TOutput, TConfig>['exec'];
  /** Runtime configuration of the node */
  configuration?: NodeConfiguration;
  /** Simulated input values the input sockets have */
  nodeInputVals?: SocketValues<TInput>;
  makeGraph?: () => IGraphApi;
}): SocketValues<TOutput> => {
  const outputs: SocketValues<TOutput> = {};

  exec({
    read: (socketName) => nodeInputVals[socketName],
    write: (outputValueName, value) => {
      outputs[outputValueName] = value;
    },
    configuration,
    graph: makeEmptyGraph()
  });

  return outputs;
};

export enum RecordedOutputType {
  write = 'write',
  commit = 'commit'
}

export type RecordedWritesOrCommits<TOutput extends SocketsDefinition> = (
  | {
      outputType: RecordedOutputType.write;
      socketName: SocketNames<TOutput>;
      value: any;
    }
  | {
      outputType: RecordedOutputType.commit;
      socketName: SocketNames<TOutput>;
    }
)[];

/**
 * Generates a function that can be used to test the triggered function of a node.
 * The trigger function will maintain state between each invokation, and returns a list
 * the recorded outputs, including the commits to flow outputs.
 * @returns
 */
export const generateTriggerTester = <
  TInput extends SocketsDefinition,
  TOutput extends SocketsDefinition,
  TState
>(
  {
    triggered,
    initialState,

    out
  }: {
    /** Triggered function from the node defintion */
    /** Runtime configuration of the node */
    configuration?: NodeConfiguration;
    makeGraph?: () => IGraphApi;
  } & Pick<
    IHasTriggered<TInput, TOutput, TState>,
    'initialState' | 'triggered'
  > & {
      out: TOutput;
    },
  configuration: NodeConfiguration = {},
  makeGraph = makeEmptyGraph
) => {
  let state: TState = initialState;

  const graph = makeGraph();

  const outputSocketKeys = getOutputSocketKeys({
    outputs: out,
    config: configuration,
    graph
  });

  /** Triggers the `triggered` function, and updates internal state. Returns a
   * list of the recorded outputs, including the commits to flow outputs.
   */
  const trigger = ({
    inputVals = {},
    triggeringSocketName
  }: {
    /** input values to simulate on the input sockets */
    inputVals?: SocketValues<TInput>;
    /** name of the flow socket that is to be triggered */
    triggeringSocketName: SocketNames<TInput>;
  }) => {
    const recordedOutputs: RecordedWritesOrCommits<TOutput> = [];
    // call the triggered function with the current state and
    // simulated input vals, and udpate the state with the result.
    state = triggered({
      triggeringSocketName,
      read: (socketName) => inputVals[socketName],
      write: (outputValueName, value) => {
        recordedOutputs.push({
          outputType: RecordedOutputType.write,
          socketName: outputValueName,
          value: value
        });
      },
      commit: (outputFlowName, fiberCompletedListener) => {
        recordedOutputs.push({
          outputType: RecordedOutputType.commit,
          socketName: outputFlowName
        });

        if (fiberCompletedListener) {
          fiberCompletedListener();
        }
      },
      configuration,
      graph,
      state: state,
      finished: () => {
        return;
      },
      outputSocketKeys
    });

    return recordedOutputs;
  };

  return trigger;
};
function getOutputSocketKeys<TSockets extends SocketsDefinition>({
  outputs,
  config,
  graph
}: {
  outputs: TSockets;
  config: NodeConfiguration;
  graph: IGraphApi;
}): SocketNames<TSockets>[] {
  const sockets = makeOrGenerateSockets(outputs, config, graph);

  return sockets.map((x) => x.name) as SocketNames<TSockets>[];
}
