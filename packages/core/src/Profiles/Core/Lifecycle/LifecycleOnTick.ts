import { Assert } from '../../../Diagnostics/Assert';
import { Engine } from '../../../Execution/Engine';
import { Graph } from '../../../Graphs/Graph';
import { EventNode } from '../../../Nodes/EventNode';
import { NodeDescription } from '../../../Nodes/Registry/NodeDescription';
import { Socket } from '../../../Sockets/Socket';
import { ILifecycleEventEmitter } from '../Abstractions/ILifecycleEventEmitter';

// inspired by: https://docs.unrealengine.com/4.27/en-US/ProgrammingAndScripting/Blueprints/UserGuide/Events/
export class LifecycleOnTick extends EventNode {
  public static Description = (lifecycleEventEmitter: ILifecycleEventEmitter) =>
    new NodeDescription(
      'lifecycle/onTick',
      'Event',
      'On Tick',
      (description, graph) =>
        new LifecycleOnTick(description, graph, lifecycleEventEmitter)
    );

  constructor(
    description: NodeDescription,
    graph: Graph,
    private readonly lifecycleEventEmitter: ILifecycleEventEmitter
  ) {
    super(
      description,
      graph,
      [],
      [new Socket('flow', 'flow'), new Socket('float', 'deltaSeconds')]
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
      engine.commitToNewFiber(this, 'flow');
      lastTickTime = currentTime;
    };

    this.lifecycleEventEmitter.tickEvent.addListener(this.onTickEvent);
  }

  dispose(engine: Engine) {
    Assert.mustBeTrue(this.onTickEvent !== undefined);
    if (this.onTickEvent !== undefined) {
      this.lifecycleEventEmitter.tickEvent.removeListener(this.onTickEvent);
    }
  }
}
