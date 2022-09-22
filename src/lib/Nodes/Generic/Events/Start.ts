import ILifecycleEventEmitter from '../../../Abstractions/ILifecycleEventEmitter';
import FlowSocket from '../../../Sockets/Typed/FlowSocket';
import Node from '../../Node';
import NodeEvalContext from '../../NodeEvalContext';

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

        const lifecycleEvents = context.graph.registry.implementations.get<ILifecycleEventEmitter>('ILifecycleEventEmitter');
        lifecycleEvents.startEvent.addListener(onStartEvent);

        context.onAsyncCancelled.addListener(() => {
          lifecycleEvents.startEvent.removeListener(onStartEvent);
        });
      },
    );

    this.async = true;
    this.evaluateOnStartup = true;
    this.interruptableAsync = true;
  }
}
