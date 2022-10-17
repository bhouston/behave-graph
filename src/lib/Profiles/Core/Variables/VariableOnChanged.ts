import { Graph } from '../../../Graphs/Graph.js';
import { Node } from '../../../Nodes/Node.js';
import { NodeDescription } from '../../../Nodes/NodeDescription.js';
import { NodeEvalContext } from '../../../Nodes/NodeEvalContext.js';
import { Socket } from '../../../Sockets/Socket.js';
import { Variable } from '../../../Variables/Variable.js';

export class VariableOnChanged extends Node {
  public static GetDescription(graph: Graph, variableId: string) {
    const variable = graph.variables[variableId];
    return new NodeDescription(
      `variable/onchanged/${variable.id}`,
      'Event',
      `On ${variable.name} Changed`,
      (nodeDescription, graph) =>
        new VariableOnChanged(nodeDescription, graph, variable)
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
      [new Socket('flow', 'flow'), new Socket(variable.valueTypeName, 'value')],
      (context: NodeEvalContext) => {
        const onValueChanged = () => {
          context.writeOutput('value', variable.get());
          context.commit('flow');
        };
        variable.onChanged.addListener(onValueChanged);

        context.onAsyncCancelled.addListener(() => {
          variable.onChanged.removeListener(onValueChanged);
        });
      }
    );

    // TODO replace with analysis of category, if Event, then evaluate on startup, it is async and interruptable.
    this.async = true;
    this.interruptibleAsync = true;
    this.evaluateOnStartup = true;
  }
}
