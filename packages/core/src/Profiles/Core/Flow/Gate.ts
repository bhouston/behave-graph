import {
  makeFlowNodeDefinition,
  NodeCategory
} from '../../../Nodes/NodeDefinitions';

// based on Unreal Engine Blueprint Gate node

export const Gate = makeFlowNodeDefinition({
  typeName: 'flow/gate',
  label: 'Gate',
  category: NodeCategory.Flow,
  in: {
    flow: 'flow',
    open: 'flow',
    close: 'flow',
    toggle: 'flow',
    startClosed: 'boolean'
  },
  out: {
    flow: 'flow'
  },
  initialState: {
    isInitialized: false,
    isClosed: true
  },
  triggered: ({ commit, read, triggeringSocketName, state }) => {
    let isClosed = state.isClosed;
    let isInitialized = state.isInitialized;

    if (!state.isInitialized) {
      isClosed = !!read('startClosed');
      isInitialized = true;
    }

    switch (triggeringSocketName) {
      case 'flow':
        if (!isClosed) {
          commit('flow');
        }
        break;
      case 'open':
        isClosed = false;
        break;
      case 'close':
        isClosed = true;
        break;
      case 'toggle':
        isClosed = !isClosed;
        break;
      default:
        throw new Error(
          `Unexpected triggering socket: ${triggeringSocketName}`
        );
    }

    return {
      isClosed,
      isInitialized
    };
  }
});
