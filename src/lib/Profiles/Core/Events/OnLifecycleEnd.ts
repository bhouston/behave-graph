import { Node } from '../../../Nodes/Node';
import { NodeEvalContext } from '../../../Nodes/NodeEvalContext';
import { ILifecycleEventEmitter } from '../../../Providers/ILifecycleEventEmitter';
import { Socket } from '../../../Sockets/Socket';

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
          context.graph.registry.implementations.get<ILifecycleEventEmitter>(
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
