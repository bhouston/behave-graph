import {
  makeFunctionNodeDefinition,
  NodeCategory
} from '../../../Nodes/NodeDefinition';
import { Variable } from '../../../Variables/Variable';

export const VariableGet = makeFunctionNodeDefinition({
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

    return {
      sockets: {
        value: {
          valueType: variable.valueTypeName,
          label: variable.name
        }
      },
      keys: ['value']
    };
  },
  exec: ({ write, graph: { variables }, configuration }) => {
    const variable = variables[configuration.variableId];

    if (!variable) return;

    write('value', variable.get());
  }
});
