import { Assert } from '../../../Diagnostics/Assert.js';
import {
  makeFlowNodeDefinition,
  NodeCategory
} from '../../../Nodes/NodeDefinitions.js';

export const ExpectTrue = makeFlowNodeDefinition({
  typeName: 'debug/expectTrue',
  category: NodeCategory.Action,
  label: 'Assert Expect True',
  in: () => {
    return [
      {
        key: 'flow',
        valueType: 'flow'
      },
      {
        key: 'condition',
        valueType: 'boolean'
      },
      {
        key: 'description',
        valueType: 'string'
      }
    ];
  },
  initialState: undefined,
  out: { flow: 'flow' },
  triggered: ({ read, commit }) => {
    Assert.mustBeTrue(read('condition'), read('description'));
    commit('flow');
  }
});
