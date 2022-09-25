import Node from '../../../Nodes/Node';
import NodeEvalContext from '../../../Nodes/NodeEvalContext';
import Socket from '../../../Sockets/Socket';

export default class TriggerCustomEvent extends Node {
  constructor() {
    super(
      'Action',
      'actions/triggerCustomEvent',
      [
        new Socket('id', 'customEvent'),
      ],
      [
        new Socket('flow', 'flow'),
      ],
      (context: NodeEvalContext) => {
        const customEventId = context.readInput('customEvent');
        const customEvent = context.getCustomEvent(customEventId);
        customEvent.eventEmitter.emit();
      },
    );
    this.async = true;
    this.interruptibleAsync = true;
  }
};
