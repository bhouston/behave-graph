import {
  makeFlowNodeDefinition,
  NodeCategory
} from '../../../Nodes/NodeDefinitions.js';

// https://docs.unrealengine.com/4.27/en-US/ProgrammingAndScripting/Blueprints/UserGuide/flow/

export const MultiGate = makeFlowNodeDefinition({
  typeName: 'flow/multiGate',
  category: NodeCategory.Flow,
  label: 'MultiGate',
  in: {
    flow: 'flow',
    reset: 'flow',
    loop: 'boolean',
    startIndex: 'integer'
  },
  out: {
    1: 'flow',
    2: 'flow',
    3: 'flow'
  },
  initialState: {
    isInitialized: false,
    nextIndex: 0
  },
  triggered: ({
    state,
    commit,
    read,
    outputSocketKeys,
    triggeringSocketName
  }) => {
    let nextIndex = state.nextIndex;
    let isInitialized = state.isInitialized;
    if (!isInitialized) {
      nextIndex = Number(read('startIndex'));
      isInitialized = true;
    }

    if (read<boolean>('loop')) {
      nextIndex = nextIndex % outputSocketKeys.length;
    }

    switch (triggeringSocketName) {
      case 'reset': {
        nextIndex = 0;
        return {
          isInitialized,
          nextIndex
        };
      }
      case 'flow': {
        if (0 <= nextIndex && nextIndex < outputSocketKeys.length) {
          const output = outputSocketKeys[nextIndex];
          commit(output);
        }
        nextIndex++;
        return {
          isInitialized,
          nextIndex
        };
      }
    }
    // these outputs are fired sequentially in an sync fashion but without delays.
    // Thus a promise is returned and it continually returns a promise until each of the sequences has been executed.
    const sequenceIteration = (i: number) => {
      if (i < outputSocketKeys.length) {
        const outputSocket = outputSocketKeys[i];
        commit(outputSocket, () => {
          sequenceIteration(i + 1);
        });
      }
    };
    sequenceIteration(0);

    return {
      isInitialized,
      nextIndex
    };
  }
});
