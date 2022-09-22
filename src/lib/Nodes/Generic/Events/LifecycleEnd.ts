import ILifecycleEventEmitter from '../../../Abstractions/ILifecycleEventEmitter';
import FlowSocket from '../../../Sockets/Typed/FlowSocket';
import Node from '../../Node';
import NodeEvalContext from '../../NodeEvalContext';

// inspired by: https://docs.unrealengine.com/4.27/en-US/ProgrammingAndScripting/Blueprints/UserGuide/Events/
export default class End extends Node {
  constructor() {
    super(
      'Event',
      'lifecycle/end',
      [],
      [new FlowSocket()],
      (context: NodeEvalContext) => {
        const onEndEvent = () => {
          context.commit('flow');
        };

        const lifecycleEvents = context.graph.registry.implementations.get<ILifecycleEventEmitter>('ILifecycleEventEmitter');
        lifecycleEvents.endEvent.addListener(onEndEvent);

        context.onAsyncCancelled.addListener(() => {
          lifecycleEvents.endEvent.removeListener(onEndEvent);
        });
      },
    );

    this.async = true;
    this.evaluateOnStartup = true;
    this.interruptibleAsync = true;
  }
}
