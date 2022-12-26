import {
  makeFlowNodeDefinition,
  SocketsMap
} from 'packages/core/src/Nodes/NodeDefinition';

// https://docs.unrealengine.com/4.27/en-US/ProgrammingAndScripting/Blueprints/UserGuide/flow/

export const Sequence = makeFlowNodeDefinition({
  typeName: 'flow/sequence',
  label: 'Sequence',
  configuration: {
    numOutputs: {
      valueType: 'number'
    }
  },
  in: {
    flow: 'flow'
  },
  out: (configuration) => {
    const numOutputs = configuration.numOutputs;
    const sockets: SocketsMap = {};

    const keys: string[] = [];

    for (let outputIndex = 1; outputIndex <= numOutputs; outputIndex++) {
      const key = `${outputIndex}`;
      keys.push(key);
      sockets[key] = 'flow';
    }

    return {
      sockets,
      keys
    };
  },
  initialState: undefined,
  triggered: ({ commit, outputSocketKeys }) => {
    // these outputs are fired sequentially in an sync fashion but without delays.
    // Thus a promise is returned and it continually returns a promise until each of the sequences has been executed.
    const sequenceIteration = (i: number) => {
      if (i < outputSocketKeys.length) {
        const outputKey = outputSocketKeys[i];
        // const outputSocket = this.outputs[i];
        commit(outputKey, () => {
          sequenceIteration(i + 1);
        });
      }
    };
    sequenceIteration(0);
    return undefined;
  }
});
