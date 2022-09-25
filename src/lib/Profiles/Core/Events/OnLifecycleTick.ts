import ILifecycleEventEmitter from '../../../Abstractions/ILifecycleEventEmitter';
import Node from '../../../Nodes/Node';
import NodeEvalContext from '../../../Nodes/NodeEvalContext';
import Socket from '../../../Sockets/Socket';

// inspired by: https://docs.unrealengine.com/4.27/en-US/ProgrammingAndScripting/Blueprints/UserGuide/Events/
export default class OnLifecycleTick extends Node {
  constructor() {
    super(
      'Event',
      'lifecycle/tick',
      [],
      [
        new Socket('flow', 'flow'),
        new Socket('number', 'deltaSeconds'),
      ],
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
