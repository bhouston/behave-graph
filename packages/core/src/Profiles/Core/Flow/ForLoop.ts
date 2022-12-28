import {
  makeFlowNodeDefinition,
  NodeCategory
} from '../../../Nodes/NodeDefinitions';

export const ForLoop = makeFlowNodeDefinition({
  typeName: 'flow/forLoop',
  category: NodeCategory.Flow,
  label: 'For Loop',
  in: {
    flow: 'flow',
    startIndex: 'integer',
    endIndex: 'integer'
  },
  out: {
    loopBody: 'flow',
    index: 'integer',
    completed: 'flow'
  },
  initialState: undefined,
  triggered: ({ read, write, commit }) => {
    const startIndex = read<bigint>('startIndex');
    const endIndex = read<bigint>('endIndex');
    for (let i = startIndex; i < endIndex; i++) {
      write('index', i);
      commit('loopBody');
    }
    commit('completed');
    return undefined;
  }
});
