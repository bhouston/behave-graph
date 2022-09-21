import FlowSocket from '../../../Sockets/Typed/FlowSocket';
import Node from '../../Node';
import NodeEvalContext from '../../NodeEvalContext';
import ILifecycleEvents from './ILifecycleEvents';

// inspired by: https://docs.unrealengine.com/4.27/en-US/ProgrammingAndScripting/Blueprints/UserGuide/Events/
export default class End extends Node {
  constructor() {
    super(
      'Event',
      'event/end',
      [],
      [new FlowSocket()],
      (context: NodeEvalContext) => {
        const onEndEvent = () => {
          context.asyncCommit('flow');
        };

        const lifecycleEvents = context.getInterface('ILifecycleEvents') as ILifecycleEvents;
        lifecycleEvents.endEvent.addListener(onEndEvent);

        context.beginAsync();
        context.onAsyncCancelled.addListener(() => {
          lifecycleEvents.endEvent.removeListener(onEndEvent);
        });
      },
    );
  }
}
