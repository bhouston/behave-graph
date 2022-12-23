import { Fiber } from '../../../Execution/Fiber';
import { Graph } from '../../../Graphs/Graph';
import { FlowNode } from '../../../Nodes/FlowNode';
import { NodeConfiguration } from '../../../Nodes/Node';
import {
  NodeDescription,
  NodeDescription2
} from '../../../Nodes/Registry/NodeDescription';
import { Socket } from '../../../Sockets/Socket';
import { Variable } from '../../../Variables/Variable';
export class VariableSet extends FlowNode {
  public static Description = new NodeDescription2({
    typeName: 'variable/set',
    category: 'Action',
    label: 'Set',
    configuration: {
      variableId: {
        variableId: '-1'
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

  private readonly variable: Variable;

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
      [
        new Socket('flow', 'flow'),
        new Socket(variable.valueTypeName, 'value', undefined, variable.name) // variable name is a label so variable can be renamed without breaking graph.
      ],
      [new Socket('flow', 'flow')],
      configuration
    );
    this.variable = variable;
  }

  triggered(fiber: Fiber, triggeredSocketName: string) {
    this.variable.set(this.readInput('value'));
    fiber.commit(this, 'flow');
  }
}
