import { Assert } from '../../../Diagnostics/Assert.js';
import { Engine } from '../../../Graphs/Execution/Engine.js';
import { Graph } from '../../../Graphs/Graph.js';
import { EventNode } from '../../../Nodes/EventNode.js';
import { NodeDescription } from '../../../Nodes/Registry/NodeDescription.js';
import { Socket } from '../../../Sockets/Socket.js';
import { ILifecycleEventEmitter } from '../Abstractions/ILifecycleEventEmitter.js';

// inspired by: https://docs.unrealengine.com/4.27/en-US/ProgrammingAndScripting/Blueprints/UserGuide/Events/
export class LifecycleOnEnd extends EventNode {
  public static Description = new NodeDescription(
    'lifecycle/onEnd',
    'Event',
    'On End',
    (description, graph) => new LifecycleOnEnd(description, graph)
  );

  constructor(description: NodeDescription, graph: Graph) {
    super(description, graph, [], [new Socket('flow', 'flow')]);
  }

  private onEndEvent: (() => void) | undefined = undefined;

  init(engine: Engine) {
    Assert.mustBeTrue(this.onEndEvent === undefined);
    this.onEndEvent = () => {
      engine.commitToNewFiber(this, 'flow');
    };

    const lifecycleEvents =
      engine.graph.registry.abstractions.get<ILifecycleEventEmitter>(
        'ILifecycleEventEmitter'
      );
    lifecycleEvents.endEvent.removeListener(this.onEndEvent);
  }

  dispose(engine: Engine) {
    Assert.mustBeTrue(this.onEndEvent !== undefined);
    if (this.onEndEvent !== undefined) {
      const lifecycleEvents =
        engine.graph.registry.abstractions.get<ILifecycleEventEmitter>(
          'ILifecycleEventEmitter'
        );
      lifecycleEvents.endEvent.removeListener(this.onEndEvent);
    }
  }
}
