import {
  makeFlowNodeDefinition,
  NodeCategory
} from 'packages/core/src/Nodes/NodeDefinition';

// based on Unreal Engine Blueprint DoN node

export const DoN = makeFlowNodeDefinition({
  typeName: 'flow/doN',
  label: 'DoN',
  category: NodeCategory.Flow,
  in: {
    flow: 'flow',
    n: 'integer',
    reset: 'flow'
  },
  out: {
    flow: 'flow',
    count: 'integer'
  },
  initialInputs: {
    n: 1
  },
  initialState: {
    count: 0
  },
  triggered: ({ commit, read, write, triggeringSocketName, state }) => {
    if (triggeringSocketName === 'reset') {
      return { count: 0 };
    }

    if (state.count < Number(read('n'))) {
      write('count', state.count);
      commit('flow');
      return { count: state.count + 1 };
    }
    return state;
  }
});
