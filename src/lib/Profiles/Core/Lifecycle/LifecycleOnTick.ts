import { Assert } from '../../../Diagnostics/Assert.js';
import { Engine } from '../../../Execution/Engine.js';
import { Graph } from '../../../Graphs/Graph.js';
import { EventNode } from '../../../Nodes/EventNode.js';
import { NodeDescription } from '../../../Nodes/Registry/NodeDescription.js';
import { Socket } from '../../../Sockets/Socket.js';
import { ILifecycleEventEmitter } from '../Abstractions/ILifecycleEventEmitter.js';

// inspired by: https://docs.unrealengine.com/4.27/en-US/ProgrammingAndScripting/Blueprints/UserGuide/Events/
export class LifecycleOnTick extends EventNode {
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
      ]
    );
  }

  private onTickEvent: (() => void) | undefined = undefined;

  init(engine: Engine) {
    Assert.mustBeTrue(this.onTickEvent === undefined);
    let lastTickTime = Date.now();
    this.onTickEvent = () => {
      const currentTime = Date.now();
      const deltaSeconds = (currentTime - lastTickTime) * 0.001;
      this.writeOutput('deltaSeconds', deltaSeconds);
      this.writeOutput('time', Date.now());
      engine.commitToNewFiber(this, 'flow');
      lastTickTime = currentTime;
    };

    const lifecycleEvents =
      engine.graph.registry.abstractions.get<ILifecycleEventEmitter>(
        'ILifecycleEventEmitter'
      );
    lifecycleEvents.tickEvent.addListener(this.onTickEvent);
  }

  dispose(engine: Engine) {
    Assert.mustBeTrue(this.onTickEvent !== undefined);
    if (this.onTickEvent !== undefined) {
      const lifecycleEvents =
        engine.graph.registry.abstractions.get<ILifecycleEventEmitter>(
          'ILifecycleEventEmitter'
        );
      lifecycleEvents.tickEvent.removeListener(this.onTickEvent);
    }
  }
}
