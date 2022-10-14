import { Node } from '../../../Nodes/Node.js';
import { NodeEvalContext } from '../../../Nodes/NodeEvalContext.js';
import { Socket } from '../../../Sockets/Socket.js';
import { ILifecycleEventEmitter } from '../Abstractions/ILifecycleEventEmitter.js';

// inspired by: https://docs.unrealengine.com/4.27/en-US/ProgrammingAndScripting/Blueprints/UserGuide/Events/
export class OnLifecycleStart extends Node {
  constructor() {
    super(
      'Event',
      'lifecycle/start',
      [],
      [new Socket('flow', 'flow')],
      (context: NodeEvalContext) => {
        const onStartEvent = () => {
          context.commit('flow');
        };

        const lifecycleEvents =
          context.graph.registry.abstractions.get<ILifecycleEventEmitter>(
            'ILifecycleEventEmitter'
          );
        lifecycleEvents.startEvent.addListener(onStartEvent);

        context.onAsyncCancelled.addListener(() => {
          lifecycleEvents.startEvent.removeListener(onStartEvent);
        });
      }
    );

    this.async = true;
    this.evaluateOnStartup = true;
    this.interruptibleAsync = true;
  }
}
