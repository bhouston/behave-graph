import { CustomEvent } from '../../../Events/CustomEvent.js';
import { Graph } from '../../../Graphs/Graph.js';
import { Node } from '../../../Nodes/Node.js';
import { NodeDescription } from '../../../Nodes/NodeDescription.js';
import { NodeEvalContext } from '../../../Nodes/NodeEvalContext.js';
import { Socket } from '../../../Sockets/Socket.js';

export class TriggerCustomEvent extends Node {
  public static GetDescription(graph: Graph, customEventId: string) {
    const customEvent = graph.customEvents[customEventId];
    return new NodeDescription(
      `customEvent/trigger/${customEvent.id}`,
      'Event',
      `On ${customEvent.name}`,
      (nodeDescription, graph) =>
        new TriggerCustomEvent(nodeDescription, graph, customEvent)
    );
  }

  constructor(
    nodeDescription: NodeDescription,
    graph: Graph,
    public readonly customEvent: CustomEvent
  ) {
    super(
      nodeDescription,
      graph,
      [
        new Socket('flow', 'flow'),
        ...customEvent.parameters.map(
          (parameter) =>
            new Socket(parameter.valueTypeName, parameter.name, parameter.value)
        )
      ],
      [new Socket('flow', 'flow')],
      (context: NodeEvalContext) => {
        const parameters: { [parameterName: string]: any } = {};
        customEvent.parameters.forEach((parameterSocket) => {
          parameters[parameterSocket.name] = context.readInput(
            parameterSocket.name
          );
        });
        customEvent.eventEmitter.emit(parameters);
      }
    );
  }
}
