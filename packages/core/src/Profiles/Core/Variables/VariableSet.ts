import {
  makeFlowNodeDefinition,
  NodeCategory,
  SocketsList
} from '../../../Nodes/NodeDefinitions';
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

    const sockets: SocketsList = [
      {
        key: 'flow',
        valueType: 'flow'
      },
      {
        key: 'value',
        valueType: variable.valueTypeName,
        label: variable.name
      }
    ];

    return sockets;
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
