import { Graph } from '../../../Graphs/Graph';
import { FunctionNode } from '../../../Nodes/FunctionNode';
import { NodeConfiguration } from '../../../Nodes/Node';
import {
  NodeDescription,
  NodeDescription2
} from '../../../Nodes/Registry/NodeDescription';
import { Socket } from '../../../Sockets/Socket';
import { Variable } from '../../../Variables/Variable';

export class VariableGet extends FunctionNode {
  public static Description = new NodeDescription2({
    typeName: 'variable/get',
    category: 'Query',
    label: 'Get',
    configuration: {
      variableId: '-1'
    },
    factory: (description, graph, configuration) =>
      new VariableGet(description, graph, configuration)
  });

  constructor(
    description: NodeDescription,
    graph: Graph,
    configuration: NodeConfiguration
  ) {
    const variable =
      graph.variables[configuration.variableId] ||
      new Variable('-1', 'undefined', 'string', '');
    super(
      description,
      graph,
      [],
      [new Socket(variable.valueTypeName, 'value', undefined, variable.name)], // output socket label uses variable name like UE4, but name is value to avoid breaking graph when variable is renamed
      () => {
        this.writeOutput('value', variable.get());
      },
      configuration
    );
  }
}
