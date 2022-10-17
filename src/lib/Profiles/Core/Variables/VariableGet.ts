import { Graph } from '../../../Graphs/Graph.js';
import { Node } from '../../../Nodes/Node.js';
import { NodeDescription } from '../../../Nodes/NodeDescription.js';
import { NodeEvalContext } from '../../../Nodes/NodeEvalContext.js';
import { Socket } from '../../../Sockets/Socket.js';
import { Variable } from '../../../Variables/Variable.js';

export class VariableGet extends Node {
  public static GetDescription(graph: Graph, variableId: string) {
    const variable = graph.variables[variableId];
    return new NodeDescription(
      `variable/get/${variable.id}`,
      'Query',
      '', // these nodes have no name in Unreal Engine Blueprints
      (nodeDescription, graph) =>
        new VariableGet(nodeDescription, graph, variable)
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
      [new Socket(variable.valueTypeName, 'value', undefined, variable.name)], // output socket label uses variable name like UE4, but name is value to avoid breaking graph when variable is renamed
      (context: NodeEvalContext) => {
        context.writeOutput('value', variable.get());
      }
    );
  }
}
