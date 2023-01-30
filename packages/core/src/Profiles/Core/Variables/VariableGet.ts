import {
  makeFunctionDescNodeDefinition,
  NodeCategory,
  SocketsList
} from '../../../Nodes/NodeDefinitions';
import { Variable } from '../../../Variables/Variable';

export const VariableGet = makeFunctionDescNodeDefinition({
  typeName: 'variable/get',
  category: NodeCategory.Query,
  label: 'Get',
  configuration: {
    variableId: {
      valueType: 'number'
    }
  },
  in: {},
  out: (configuration, graph) => {
    const variable =
      graph.variables[configuration.variableId] ||
      new Variable('-1', 'undefined', 'string', '');

    const result: SocketsList = [
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

    return result;
  },
  exec: ({ write, graph: { variables }, configuration }) => {
    const variable = variables[configuration.variableId];

    if (!variable) return;

    write('value', variable.get());
  }
});
