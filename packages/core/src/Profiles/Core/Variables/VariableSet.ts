import { Fiber } from '../../../Execution/Fiber';
import { Graph } from '../../../Graphs/Graph';
import { FlowNode } from '../../../Nodes/FlowNode';
import { NodeDescription } from '../../../Nodes/Registry/NodeDescription';
import { Socket } from '../../../Sockets/Socket';
import { Variable } from '../../../Variables/Variable';

export class VariableSet extends FlowNode {
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
    public readonly variable: Variable
  ) {
    super(
      description,
      graph,
      [
        new Socket('flow', 'flow'),
        new Socket(variable.valueTypeName, 'value', undefined, variable.name) // variable name is a label so variable can be renamed without breaking graph.
      ],
      [new Socket('flow', 'flow')]
    );
  }

  triggered(fiber: Fiber, triggeredSocketName: string) {
    this.variable.set(this.read('value'));
    fiber.commit(this, 'flow');
  }
}
