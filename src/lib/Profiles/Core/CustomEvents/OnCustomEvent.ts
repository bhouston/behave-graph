import { CustomEvent } from '../../../Events/CustomEvent.js';
import { Graph } from '../../../Graphs/Graph.js';
import { EventNode } from '../../../Nodes/EventNode.js';
import { NodeEvalContext } from '../../../Nodes/NodeEvalContext.js';
import { NodeDescription } from '../../../Nodes/Registry/NodeDescription.js';
import { Socket } from '../../../Sockets/Socket.js';

export class OnCustomEvent extends EventNode {
  public static GetDescription(graph: Graph, customEventId: string) {
    const customEvent = graph.customEvents[customEventId];
    return new NodeDescription(
      `customEvent/onTriggered/${customEvent.id}`,
      'Event',
      `On ${customEvent.name}`,
      (description, graph) => new OnCustomEvent(description, graph, customEvent)
    );
  }

  constructor(
    description: NodeDescription,
    graph: Graph,
    public readonly customEvent: CustomEvent
  ) {
    super(
      description,
      graph,
      [],
      [
        new Socket('flow', 'flow'),
        ...customEvent.parameters.map(
          (parameter) =>
            new Socket(
              parameter.valueTypeName,
              parameter.name,
              parameter.value,
              parameter.label
            )
        )
      ],
      (context: NodeEvalContext) => {
        customEvent.eventEmitter.addListener((parameters) => {
          customEvent.parameters.forEach((parameterSocket) => {
            if (!(parameterSocket.name in parameters)) {
              throw new Error(
                `parameters of custom event do not align with parameters of custom event node, missing ${parameterSocket.name}`
              );
            }
            this.writeOutput(
              parameterSocket.name,
              parameters[parameterSocket.name]
            );
          });
          context.commit('flow');
        });
      }
    );
  }
}
