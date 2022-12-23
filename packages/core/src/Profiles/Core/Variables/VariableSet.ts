import { NodeConfiguration } from 'packages/core/src/Nodes/Node';

import { Assert } from '../../../Diagnostics/Assert';
import { Fiber } from '../../../Execution/Fiber';
import { Graph } from '../../../Graphs/Graph';
import { FlowNode } from '../../../Nodes/FlowNode';
import {
  NodeDescription,
  NodeDescription2
} from '../../../Nodes/Registry/NodeDescription';
import { Socket } from '../../../Sockets/Socket';
export class VariableSet extends FlowNode {
  public static Description = new NodeDescription2({
    typeName: 'variable/set',
    category: 'Action',
    label: 'Set',
    configuration: {
      variableId: {
        valueType: 'number'
      }
    },
    factory: (description, graph, configuration) =>
      new VariableSet(description, graph, configuration)
  });

  public static GetDescription(graph: Graph, variableId: string) {
    const variable = graph.variables[variableId];
    return new NodeDescription(
      `variable/set/${variable.id}`,
      'Action',
      `Set`,
      (description, graph) => new VariableSet(description, graph, variable)
    );
  }

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
      [
        new Socket('flow', 'flow'),
        new Socket(variable.valueTypeName, 'value', undefined, variable.name) // variable name is a label so variable can be renamed without breaking graph.
      ],
      [new Socket('flow', 'flow')],
      configuration
    );
  }

  triggered(fiber: Fiber, triggeredSocketName: string) {
    const variable = this.graph.variables[this.configuration.variableId];

    variable.set(this.readInput('value'));
    fiber.commit(this, 'flow');
  }
}
