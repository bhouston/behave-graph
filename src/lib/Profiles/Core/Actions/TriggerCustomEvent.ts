import { Graph } from '../../../Graphs/Graph.js';
import { Node } from '../../../Nodes/Node.js';
import { NodeEvalContext } from '../../../Nodes/NodeEvalContext.js';
import { Socket } from '../../../Sockets/Socket.js';

export class TriggerCustomEvent extends Node {
  constructor(
    public readonly graph: Graph,
    public readonly customEventId: string
  ) {
    const customEvent = graph.customEvents[customEventId];
    const inputSockets = [
      new Socket('flow', 'flow'),
      ...customEvent.parameters.map(
        (parameter) =>
          new Socket(parameter.valueTypeName, parameter.name, parameter.value)
      )
    ];

    super(
      'Action',
      `action/triggerCustomEvent/${customEvent.id}`,
      inputSockets,
      [new Socket('flow', 'flow')],
      (context: NodeEvalContext) => {
        const customEvent = context.getCustomEvent(customEventId);
        const parameters: { [parameterName: string]: any } = {};
        for (let i = 1; i < this.inputSockets.length; i++) {
          const inputSocketName = inputSockets[i].name;
          parameters[inputSocketName] = context.readInput(inputSocketName);
        }
        customEvent.eventEmitter.emit(parameters);
      }
    );
  }
}
