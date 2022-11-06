import { Graph, Variables } from '../../../Graphs/Graph.js';
import { Node } from '../../../Nodes/Node.js';
import { NodeDescription } from '../../../Nodes/NodeDescription.js';
import { NodeEvalContext } from '../../../Nodes/NodeEvalContext.js';
import { Socket } from '../../../Sockets/Socket.js';
import { Variable } from '../../../Variables/Variable.js';

export class VariableGet extends Node {
  public static GetDescription(variables: Variables, variableId: string) {
    const variable = variables[variableId];
    return new NodeDescription(
      `variable/get/${variable.id}`,
      'Query',
      '', // these nodes have no name in Unreal Engine Blueprints
      (description, graph) => new VariableGet(description, graph, variable)
    );
  }

  constructor(description: NodeDescription, graph: Graph, public readonly variable: Variable) {
    super(
      description,
      graph,
      [],
      [new Socket(variable.valueTypeName, 'value', undefined, variable.name)], // output socket label uses variable name like UE4, but name is value to avoid breaking graph when variable is renamed
      (context: NodeEvalContext) => {
        context.writeOutput('value', variable.get());
      }
    );
  }
}
