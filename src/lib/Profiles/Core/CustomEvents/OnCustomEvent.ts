import { CustomEvent } from '../../../Events/CustomEvent.js';
import { Graph } from '../../../Graphs/Graph.js';
import { Node } from '../../../Nodes/Node.js';
import { NodeDescription } from '../../../Nodes/NodeDescription.js';
import { NodeEvalContext } from '../../../Nodes/NodeEvalContext.js';
import { Socket } from '../../../Sockets/Socket.js';

export class OnCustomEvent extends Node {
  public static GetDescription(graph: Graph, customEventId: string) {
    const customEvent = graph.customEvents[customEventId];
    return new NodeDescription(
      `customEvent/ontriggered/${customEvent.id}`,
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
            context.writeOutput(
              parameterSocket.name,
              parameters[parameterSocket.name]
            );
          });
          context.commit('flow');
        });
      }
    );

    // TODO replace with analysis of category, if Event, then evaluate on startup, it is async and interruptable.
    this.evaluateOnStartup = true;
    this.async = true;
    this.interruptibleAsync = true;
  }
}
