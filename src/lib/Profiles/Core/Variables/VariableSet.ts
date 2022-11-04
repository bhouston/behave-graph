import { Graph } from '../../../Graphs/Graph.js';
import { FlowNode } from '../../../Nodes/FlowNode.js';
import { NodeEvalContext } from '../../../Nodes/NodeEvalContext.js';
import { NodeDescription } from '../../../Nodes/Registry/NodeDescription.js';
import { Socket } from '../../../Sockets/Socket.js';
import { Variable } from '../../../Variables/Variable.js';

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
      [new Socket('flow', 'flow')],
      (context: NodeEvalContext) => {
        variable.set(this.readInput('value'));
      }
    );
  }
}
