import { CustomEvent } from '../../../Events/CustomEvent.js';
import { Fiber } from '../../../Execution/Fiber.js';
import { IGraphApi } from '../../../Graphs/Graph.js';
import { FlowNode2 } from '../../../Nodes/FlowNode.js';
import { NodeConfiguration } from '../../../Nodes/Node.js';
import {
  NodeDescription,
  NodeDescription2
} from '../../../Nodes/Registry/NodeDescription.js';
import { Socket } from '../../../Sockets/Socket.js';

export class TriggerCustomEvent extends FlowNode2 {
  public static Description = new NodeDescription2({
    typeName: 'customEvent/trigger',
    category: 'Action',
    label: 'Trigger',
    configuration: {
      customEventId: {
        valueType: 'string',
        defaultValue: '-1'
      }
    },
    factory: (description, graph, configuration) =>
      new TriggerCustomEvent(description, graph, configuration)
  });

  private readonly customEvent: CustomEvent;

  constructor(
    description: NodeDescription,
    graph: IGraphApi,
    configuration: NodeConfiguration
  ) {
    const customEvent =
      graph.customEvents[configuration.customEventId] ||
      new CustomEvent('-1', 'undefined');
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
      outputs: [new Socket('flow', 'flow')],
      configuration
    });

    this.customEvent = customEvent;
  }

  triggered(fiber: Fiber, triggeringSocketName: string) {
    const parameters: { [parameterName: string]: any } = {};
    this.customEvent.parameters.forEach((parameterSocket) => {
      parameters[parameterSocket.name] = this.readInput(parameterSocket.name);
    });
    this.customEvent.eventEmitter.emit(parameters);
  }
}
