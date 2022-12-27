import {
  FunctionNodeInstance,
  FunctionNodeInstanceCtrParams,
  INode
} from '../../..//Nodes/NodeInstance';
import {
  makeFunctionNodeDefinition,
  NodeCategory
} from '../../../Nodes/NodeDefinition';
import { Variable } from '../../../Variables/Variable';

class VariableGetNode extends FunctionNodeInstance {
  constructor(
    props: FunctionNodeInstanceCtrParams,
    private readonly variable: Variable
  ) {
    super(props);
  }

  public override exec(node: INode) {}
}

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
  },
  factory: (definion, id, nodeConfig, graph) => {
    const variable =
      graph.variables[nodeConfig.configuration.variableId] ||
      new Variable('-1', 'undefined', 'string', '');

    return {
      ...definion,
      id,
      configuration: nodeConfig.configuration,
      in: {},
      out: {
        sockets: {
          value: {
            valueType: variable.valueTypeName,
            label: variable.name
          }
        },
        keys: ['value']
      }
    };
  }
});
