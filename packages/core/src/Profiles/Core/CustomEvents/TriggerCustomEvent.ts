import { CustomEvent } from '../../../Events/CustomEvent';
import { Fiber } from '../../../Execution/Fiber';
import { Graph } from '../../../Graphs/Graph';
import { FlowNode2 } from '../../../Nodes/FlowNode';
import { NodeDescription } from '../../../Nodes/Registry/NodeDescription';
import { Socket } from '../../../Sockets/Socket';

export class TriggerCustomEvent extends FlowNode2 {
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
    super({
      description,
      graph,
      inputs: [
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
      outputs: [new Socket('flow', 'flow')]
    });
  }

  triggered(fiber: Fiber, triggeringSocketName: string) {
    const parameters: { [parameterName: string]: any } = {};
    this.customEvent.parameters.forEach((parameterSocket) => {
      parameters[parameterSocket.name] = this.read(parameterSocket.name);
    });
    this.customEvent.eventEmitter.emit(parameters);
  }
}
