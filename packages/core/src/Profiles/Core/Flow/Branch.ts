import {
  makeFlowNodeDefinition,
  NodeCategory
} from '../../../Nodes/NodeDefinitions.js';

export const Branch = makeFlowNodeDefinition({
  typeName: 'flow/branch',
  category: NodeCategory.Flow,
  label: 'Branch',
  helpDescription:
    "Checks the value of the 'condition' input and if true, executes the 'true' branch, otherwise it executes the 'false' branch.",
  in: {
    flow: 'flow',
    condition: 'boolean'
  },
  out: {
    true: 'flow',
    false: 'flow'
  },
  triggered: ({ read, commit }) => {
    commit(read('condition') === true ? 'true' : 'false');
  },
  initialState: undefined
});
