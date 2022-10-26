import { Node } from '../../../Nodes/Node.js';
import { NodeEvalContext } from '../../../Nodes/NodeEvalContext.js';
import { Socket } from '../../../Sockets/Socket.js';

// inspired by: https://docs.unrealengine.com/4.27/en-US/ProgrammingAndScripting/Blueprints/UserGuide/Events/
export class OnLifecycleEnd extends Node {
  constructor() {
    super(
      'Event',
      'lifecycle/end',
      [],
      [new Socket('flow', 'flow')],
      (context: NodeEvalContext) => {
        const onEndEvent = () => {
          context.commit('flow');
        };

        const lifecycleEvents =
          context.graph.registry.abstractions.get(
            'ILifecycleEventEmitter'
          );
        lifecycleEvents.endEvent.addListener(onEndEvent);

        context.onAsyncCancelled.addListener(() => {
          lifecycleEvents.endEvent.removeListener(onEndEvent);
        });
      }
    );

    this.async = true;
    this.evaluateOnStartup = true;
    this.interruptibleAsync = true;
  }
}
