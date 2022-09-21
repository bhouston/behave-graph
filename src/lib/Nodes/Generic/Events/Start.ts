import FlowSocket from '../../../Sockets/Typed/FlowSocket';
import Node from '../../Node';
import NodeEvalContext from '../../NodeEvalContext';
import ILifecycleEvents from './ILifecycleEvents';

// inspired by: https://docs.unrealengine.com/4.27/en-US/ProgrammingAndScripting/Blueprints/UserGuide/Events/
export default class Start extends Node {
  constructor() {
    super(
      'Event',
      'event/start',
      [],
      [new FlowSocket()],
      (context: NodeEvalContext) => {
        const onStartEvent = () => {
          context.asyncCommit('flow');
        };

        const lifecycleEvents = context.getInterface('ILifecycleEvents') as ILifecycleEvents;
        lifecycleEvents.startEvent.addListener(onStartEvent);

        context.beginAsync();
        context.onAsyncCancelled.addListener(() => {
          lifecycleEvents.startEvent.addListener(onStartEvent);
        });
      },
    );
  }
}
