import ILifecycleEventEmitter from '../../../Abstractions/ILifecycleEventEmitter';
import FlowSocket from '../../../Sockets/Typed/FlowSocket';
import NumberSocket from '../../../Sockets/Typed/NumberSocket';
import Node from '../../Node';
import NodeEvalContext from '../../NodeEvalContext';

// inspired by: https://docs.unrealengine.com/4.27/en-US/ProgrammingAndScripting/Blueprints/UserGuide/Events/
export default class OnLifecycleTick extends Node {
  constructor() {
    super(
      'Event',
      'lifecycle/tick',
      [],
      [new FlowSocket(), new NumberSocket('deltaSeconds')],
      (context: NodeEvalContext) => {
        let lastTickTime = Date.now();
        const onTickEvent = () => {
          const currentTime = Date.now();
          const deltaSeconds = (currentTime - lastTickTime) * 0.001;
          context.writeOutput('deltaSeconds', deltaSeconds);
          context.commit('flow');
          lastTickTime = currentTime;
        };

        const lifecycleEvents = context.graph.registry.implementations.get<ILifecycleEventEmitter>('ILifecycleEventEmitter');
        lifecycleEvents.tickEvent.addListener(onTickEvent);

        context.onAsyncCancelled.addListener(() => {
          lifecycleEvents.tickEvent.removeListener(onTickEvent);
        });
      },
    );

    this.async = true;
    this.evaluateOnStartup = true;
    this.interruptibleAsync = true;
  }
}
