import { CustomEvent } from '../../../Events/CustomEvent.js';
import { Graph } from '../../../Graphs/Graph.js';
import { FlowNode } from '../../../Nodes/FlowNode.js';
import { NodeDescription } from '../../../Nodes/Registry/NodeDescription.js';
import { Socket } from '../../../Sockets/Socket.js';

export class TriggerCustomEvent extends FlowNode {
  public static GetDescription(graph: Graph, customEventId: string) {
    const customEvent = graph.customEvents[customEventId];
    return new NodeDescription(
      `customEvent/trigger/${customEvent.id}`,
      'Action',
      `Trigger ${customEvent.name}`,
      (description, graph) =>
        new TriggerCustomEvent(description, graph, customEvent)
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
      [new Socket('flow', 'flow')],
      () => {
        const parameters: { [parameterName: string]: any } = {};
        customEvent.parameters.forEach((parameterSocket) => {
          parameters[parameterSocket.name] = this.readInput(
            parameterSocket.name
          );
        });
        customEvent.eventEmitter.emit(parameters);
      }
    );
  }
}
