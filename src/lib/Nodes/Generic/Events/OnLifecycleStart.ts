import ILifecycleEventEmitter from '../../../Abstractions/ILifecycleEventEmitter';
import FlowSocket from '../../../Sockets/Typed/FlowSocket';
import Node from '../../Node';
import NodeEvalContext from '../../NodeEvalContext';

// inspired by: https://docs.unrealengine.com/4.27/en-US/ProgrammingAndScripting/Blueprints/UserGuide/Events/
export default class OnLifecycleStart extends Node {
  constructor() {
    super(
      'Event',
      'lifecycle/start',
      [],
      [new FlowSocket()],
      (context: NodeEvalContext) => {
        const onStartEvent = () => {
          context.commit('flow');
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
    this.interruptibleAsync = true;
  }
}
