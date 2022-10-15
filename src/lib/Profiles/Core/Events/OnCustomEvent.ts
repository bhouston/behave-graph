import { Graph } from '../../../Graphs/Graph.js';
import { Node } from '../../../Nodes/Node.js';
import { NodeEvalContext } from '../../../Nodes/NodeEvalContext.js';
import { Socket } from '../../../Sockets/Socket.js';

export class OnCustomEvent extends Node {
  constructor(
    public readonly graph: Graph,
    public readonly customEventId: string
  ) {
    const customEvent = graph.customEvents[customEventId];
    const outputSockets = [
      new Socket('flow', 'flow'),
      ...customEvent.parameters.map(
        (parameter) =>
          new Socket(parameter.valueTypeName, parameter.name, parameter.value)
      )
    ];
    super(
      'Event',
      `event/customEvent/${customEvent.id}`,
      [],
      outputSockets,
      (context: NodeEvalContext) => {
        customEvent.eventEmitter.addListener((parameters) => {
          Object.keys(parameters).forEach((parameterName) =>
            context.writeOutput(parameterName, parameters[parameterName])
          );
          context.commit('flow');
        });
      }
    );
    this.evaluateOnStartup = true;
    this.async = true;
    this.interruptibleAsync = true;
  }
}
