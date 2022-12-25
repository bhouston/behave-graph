import {
  makeFlowNodeDefinition,
  NodeCategory
} from 'packages/core/src/Nodes/NodeDefinition';
// based on Unreal Engine Blueprint DoN node

export const DoOnce = makeFlowNodeDefinition({
  typeName: 'flow/doOnce',
  label: 'DoOnce',
  category: NodeCategory.Flow,
  in: {
    flow: 'flow',
    reset: 'flow'
  },
  out: {
    flow: 'flow'
  },
  initialState: {
    firedOnce: false
  },
  triggered: ({ commit, triggeringSocketName, state }) => {
    if (triggeringSocketName === 'reset') {
      return { firedOnce: false };
    }

    if (!state.firedOnce) {
      commit('flow');
      return { firedOnce: true };
    }
    return state;
  }
});
