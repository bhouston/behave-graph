import { Node } from '../../../Nodes/Node.js';
import { NodeEvalContext } from '../../../Nodes/NodeEvalContext.js';
import { Socket } from '../../../Sockets/Socket.js';

export class TriggerCustomEvent extends Node {
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
