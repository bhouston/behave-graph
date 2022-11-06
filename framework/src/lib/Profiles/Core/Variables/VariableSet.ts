import { Graph, Variables } from '../../../Graphs/Graph.js';
import { Node } from '../../../Nodes/Node.js';
import { NodeDescription } from '../../../Nodes/NodeDescription.js';
import { NodeEvalContext } from '../../../Nodes/NodeEvalContext.js';
import { Socket } from '../../../Sockets/Socket.js';
import { Variable } from '../../../Variables/Variable.js';

export class VariableSet extends Node {
  public static GetDescription(variables: Variables, variableId: string) {
    const variable = variables[variableId];
    return new NodeDescription(
      `variable/set/${variable.id}`,
      'Action',
      `Set`,
      (description, graph) => new VariableSet(description, graph, variable)
    );
  }

  constructor(description: NodeDescription, graph: Graph, public readonly variable: Variable) {
    super(
      description,
      graph,
      [
        new Socket('flow', 'flow'),
        new Socket(variable.valueTypeName, 'value', undefined, variable.name), // variable name is a label so variable can be renamed without breaking graph.
      ],
      [new Socket('flow', 'flow')],
      (context: NodeEvalContext) => {
        variable.set(context.readInput('value'));
      }
    );
  }
}
