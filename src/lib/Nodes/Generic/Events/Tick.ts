import ILifecycleAbstraction from '../../../Abstractions/ILifecycleAbstraction';
import FlowSocket from '../../../Sockets/Typed/FlowSocket';
import NumberSocket from '../../../Sockets/Typed/NumberSocket';
import Node from '../../Node';
import NodeEvalContext from '../../NodeEvalContext';

// inspired by: https://docs.unrealengine.com/4.27/en-US/ProgrammingAndScripting/Blueprints/UserGuide/Events/
export default class Tick extends Node {
  constructor() {
    super(
      'Event',
      'event/tick',
      [],
      [new FlowSocket(), new NumberSocket('deltaSeconds')],
      (context: NodeEvalContext) => {
        let lastTickTime = Date.now();
        const onTickEvent = () => {
          const currentTime = Date.now();
          const deltaSeconds = (currentTime - lastTickTime) * 0.001;
          context.setOutputValue('deltaSeconds', deltaSeconds);
          context.asyncCommit('flow');
          lastTickTime = currentTime;
        };

        const lifecycleEvents = context.graph.registry.abstractions.get<ILifecycleAbstraction>('ILifecycleConnector');
        lifecycleEvents.tickEvent.addListener(onTickEvent);

        context.beginAsync();
        context.onAsyncCancelled.addListener(() => {
          lifecycleEvents.tickEvent.addListener(onTickEvent);
        });
      },
    );
  }
}
