import { Graph } from '../../../Graphs/Graph.js';
import { Node } from '../../../Nodes/Node.js';
import { NodeDescription } from '../../../Nodes/NodeDescription.js';
import { NodeEvalContext } from '../../../Nodes/NodeEvalContext.js';
import { Socket } from '../../../Sockets/Socket.js';
import { ILifecycleEventEmitter } from '../Abstractions/ILifecycleEventEmitter.js';

// inspired by: https://docs.unrealengine.com/4.27/en-US/ProgrammingAndScripting/Blueprints/UserGuide/Events/
export class LifecycleOnStart extends Node {
  public static Description  = (emitter: ILifecycleEventEmitter) => new NodeDescription(
    'lifecycle/onStart',
    'Event',
    'On Start',
    (description, graph) => new LifecycleOnStart(description, graph, emitter)
  );

  constructor(description: NodeDescription, graph: Graph, private readonly iLifecycleEmitter: ILifecycleEventEmitter) {
    super(
      description,
      graph,
      [],
      [new Socket('flow', 'flow')],
      (context: NodeEvalContext) => {
        const onStartEvent = () => {
          context.commit('flow');
        };

        const lifecycleEvents = this.iLifecycleEmitter
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