import {
  makeFlowNodeDefinition,
  NodeCategory
} from 'packages/core/src/Nodes/NodeDefinition';

import { Variable } from '../../../Variables/Variable';

export const VariableSet = makeFlowNodeDefinition({
  typeName: 'variable/set',
  category: NodeCategory.Action,
  label: 'Set',
  configuration: {
    variableId: {
      valueType: 'number'
    }
  },
  in: (configuration, graph) => {
    const variable =
      graph.variables[configuration.variableId] ||
      new Variable('-1', 'undefined', 'string', '');

    return {
      sockets: {
        flow: 'flow',
        value: {
          valueType: variable.valueTypeName,
          label: variable.name
        }
      },
      keys: ['value', 'flow']
    };
  },
  initialState: undefined,
  out: { flow: 'flow' },
  triggered: ({ read, commit, graph: { variables }, configuration }) => {
    const variable = variables[configuration.variableId];

    if (!variable) return;

    variable.set(read('value'));
    commit('flow');

    return undefined;
  }
});
