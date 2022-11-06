import { CustomEvent } from '../../../Events/CustomEvent.js';
import { CustomEvents, Graph } from '../../../Graphs/Graph.js';
import { Node } from '../../../Nodes/Node.js';
import { NodeDescription } from '../../../Nodes/NodeDescription.js';
import { NodeEvalContext } from '../../../Nodes/NodeEvalContext.js';
import { Socket } from '../../../Sockets/Socket.js';

export class TriggerCustomEvent extends Node {
  public static GetDescription(customEvents: CustomEvents, customEventId: string) {
    const customEvent = customEvents[customEventId];
    return new NodeDescription(
      `customEvent/trigger/${customEvent.id}`,
      'Action',
      `Trigger ${customEvent.name}`,
      (description, graph) => new TriggerCustomEvent(description, graph, customEvent)
    );
  }

  constructor(description: NodeDescription, graph: Graph, public readonly customEvent: CustomEvent) {
    super(
      description,
      graph,
      [
        new Socket('flow', 'flow'),
        ...customEvent.parameters.map(
          (parameter) => new Socket(parameter.valueTypeName, parameter.name, parameter.value, parameter.label)
        ),
      ],
      [new Socket('flow', 'flow')],
      (context: NodeEvalContext) => {
        const parameters: { [parameterName: string]: any } = {};
        customEvent.parameters.forEach((parameterSocket) => {
          parameters[parameterSocket.name] = context.readInput(parameterSocket.name);
        });
        customEvent.eventEmitter.emit(parameters);
      }
    );
  }
}
