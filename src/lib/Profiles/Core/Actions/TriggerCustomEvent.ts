import Node from '../../../Nodes/Node';
import NodeEvalContext from '../../../Nodes/NodeEvalContext';
import Socket from '../../../Sockets/Socket';

export default class TriggerCustomEvent extends Node {
  constructor() {
    super(
      'Action',
      'action/triggerCustomEvent',
      [new Socket('flow', 'flow'), new Socket('id', 'customEvent')],
      [new Socket('flow', 'flow')],
      (context: NodeEvalContext) => {
        const customEventId = context.readInput<string>('customEvent');
        const customEvent = context.getCustomEvent(customEventId);
        customEvent.eventEmitter.emit();
      }
    );
  }
}
