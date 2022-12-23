import { NodeConfiguration } from 'packages/core/src/Nodes/Node';

import { Fiber } from '../../../Execution/Fiber';
import { Graph } from '../../../Graphs/Graph';
import { FlowNode2 } from '../../../Nodes/FlowNode';
import {
  NodeDescription,
  NodeDescription2
} from '../../../Nodes/Registry/NodeDescription';
import { Socket } from '../../../Sockets/Socket';

export class TriggerCustomEvent extends FlowNode2 {
  public static Description = new NodeDescription2({
    typeName: 'customEvent/trigger',
    category: 'Action',
    label: 'Trigger',
    configuration: {
      customEventId: {
        valueType: 'number'
      }
    },
    factory: (description, graph, configuration) =>
      new TriggerCustomEvent(description, graph, configuration)
  });

  constructor(
    description: NodeDescription,
    graph: Graph,
    configuration: NodeConfiguration
  ) {
    const customEvent = graph.customEvents[configuration.customEventId];
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
  }

  triggered(fiber: Fiber, triggeringSocketName: string) {
    const customEvent =
      this.graph.customEvents[this.configuration.customEventId];
    const parameters: { [parameterName: string]: any } = {};
    customEvent.parameters.forEach((parameterSocket) => {
      parameters[parameterSocket.name] = this.readInput(parameterSocket.name);
    });
    customEvent.eventEmitter.emit(parameters);
  }
}
