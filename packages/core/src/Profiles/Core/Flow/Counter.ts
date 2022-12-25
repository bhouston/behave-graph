import {
  makeFlowNodeDefinition,
  NodeCategory
} from 'packages/core/src/Nodes/NodeDefinition';

export const Counter = makeFlowNodeDefinition({
  typeName: 'flow/counter',
  label: 'Counter',
  in: {
    flow: 'flow',
    reset: 'flow'
  },
  out: {
    flow: 'flow',
    count: 'integer'
  },
  initialState: {
    count: 0
  },
  category: NodeCategory.Flow,
  triggered: ({ commit, write, triggeringSocketName, state }) => {
    let count = state.count;
    switch (triggeringSocketName) {
      case 'flow': {
        count++;
        // through type enforcement, write and commit can only write to one of the keys of `out`
        write('count', count);
        commit('flow');
        break;
      }
      case 'reset': {
        count = 0;
        break;
      }
      default:
        throw new Error('should not get here');
    }

    // return updated state
    return {
      count
    };
  }
});
