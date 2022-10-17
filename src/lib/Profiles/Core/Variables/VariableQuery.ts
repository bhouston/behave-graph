import { Graph } from '../../../Graphs/Graph.js';
import { Node } from '../../../Nodes/Node.js';
import { NodeDescription } from '../../../Nodes/NodeDescription.js';
import { NodeEvalContext } from '../../../Nodes/NodeEvalContext.js';
import { Socket } from '../../../Sockets/Socket.js';
import { Variable } from '../../../Variables/Variable.js';

export class VariableQuery extends Node {
  public static GetDescription(graph: Graph, variableId: string) {
    const variable = graph.variables[variableId];
    return new NodeDescription(
      `variable/query/${variable.id}`,
      'Query',
      `${variable.name}`,
      (nodeDescription, graph) =>
        new VariableQuery(nodeDescription, graph, variable)
    );
  }

  constructor(
    nodeDescription: NodeDescription,
    graph: Graph,
    public readonly variable: Variable
  ) {
    super(
      nodeDescription,
      graph,
      [],
      [new Socket(variable.valueTypeName, 'value')],
      (context: NodeEvalContext) => {
        context.writeOutput('value', variable.get());
      }
    );
  }
}
