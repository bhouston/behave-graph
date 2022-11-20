import { Graph } from '../../../Graphs/Graph.js';
import { ImmediateNode } from '../../../Nodes/ImmediateNode.js';
import { NodeDescription } from '../../../Nodes/Registry/NodeDescription.js';
import { Socket } from '../../../Sockets/Socket.js';
import { Variable } from '../../../Variables/Variable.js';

export class VariableGet extends ImmediateNode {
  public static GetDescription(graph: Graph, variableId: string) {
    const variable = graph.variables[variableId];
    return new NodeDescription(
      `variable/get/${variable.id}`,
      'Query',
      '', // these nodes have no name in Unreal Engine Blueprints
      (description, graph) => new VariableGet(description, graph, variable)
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
      [],
      [new Socket(variable.valueTypeName, 'value', undefined, variable.name)], // output socket label uses variable name like UE4, but name is value to avoid breaking graph when variable is renamed
      () => {
        this.writeOutput('value', variable.get());
      }
    );
  }
}
