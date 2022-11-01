import { Graph } from '../../../Graphs/Graph.js';
import { Node } from '../../../Nodes/Node.js';
import { NodeDescription } from '../../../Nodes/NodeDescription.js';
import { NodeEvalContext } from '../../../Nodes/NodeEvalContext.js';
import { Socket } from '../../../Sockets/Socket.js';
import { ILifecycleEventEmitter } from '../Abstractions/ILifecycleEventEmitter.js';

// inspired by: https://docs.unrealengine.com/4.27/en-US/ProgrammingAndScripting/Blueprints/UserGuide/Events/
export class LifecycleOnTick extends Node {
  public static Description = new NodeDescription(
    'lifecycle/onTick',
    'Event',
    'On Tick',
    (description, graph) => new LifecycleOnTick(description, graph)
  );

  constructor(description: NodeDescription, graph: Graph) {
    super(
      description,
      graph,
      [],
      [
        new Socket('flow', 'flow'),
        new Socket('float', 'deltaSeconds'),
        new Socket('float', 'time')
      ],
      (context: NodeEvalContext) => {
        let lastTickTime = Date.now();
        const onTickEvent = () => {
          const currentTime = Date.now();
          const deltaSeconds = (currentTime - lastTickTime) * 0.001;
          this.writeOutput('deltaSeconds', deltaSeconds);
          this.writeOutput('time', Date.now());
          context.commit('flow');
          lastTickTime = currentTime;
        };

        const lifecycleEvents =
          context.graph.registry.abstractions.get<ILifecycleEventEmitter>(
            'ILifecycleEventEmitter'
          );
        lifecycleEvents.tickEvent.addListener(onTickEvent);

        context.onAsyncCancelled.addListener(() => {
          lifecycleEvents.tickEvent.removeListener(onTickEvent);
        });
      }
    );

    this.async = true;
    this.evaluateOnStartup = true;
    this.interruptibleAsync = true;
  }
}
