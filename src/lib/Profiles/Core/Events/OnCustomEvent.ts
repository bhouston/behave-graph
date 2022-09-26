import Node from '../../../Nodes/Node';
import NodeEvalContext from '../../../Nodes/NodeEvalContext';
import Socket from '../../../Sockets/Socket';

export default class OnCustomEvent extends Node {
  constructor() {
    super(
      'Event',
      'event/customEvent',
      [
        new Socket('id', 'customEvent'),
      ],
      [
        new Socket('flow', 'flow'),
      ],
      (context: NodeEvalContext) => {
        const customEventId = context.readInput('customEvent');
        const customEvent = context.getCustomEvent(customEventId);
        customEvent.eventEmitter.addListener(() => {
          context.commit('flow');
        });
      },
    );
    this.evaluateOnStartup = true;
    this.async = true;
    this.interruptibleAsync = true;
  }
};
