import { Assert } from '../../../Diagnostics/Assert';
import { Graph } from '../../../Graphs/Graph';
import { ImmediateNode } from '../../../Nodes/ImmediateNode';
import { NodeConfiguration } from '../../../Nodes/Node';
import {
  NodeDescription,
  NodeDescription2
} from '../../../Nodes/Registry/NodeDescription';
import { Socket } from '../../../Sockets/Socket';

export class VariableGet extends ImmediateNode {
  public static Description = new NodeDescription2({
    typeName: 'variable/get',
    category: 'Query',
    label: 'Get',
    configuration: {
      variableId: {
        valueType: 'number'
      }
    },
    factory: (description, graph, configuration) =>
      new VariableGet(description, graph, configuration)
  });

  constructor(
    description: NodeDescription,
    graph: Graph,
    configuration: NodeConfiguration
  ) {
    Assert.mustBeDefined(configuration.variableId);
    const variable = graph.variables[configuration.variableId];
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
