import { Assert } from '../../../Diagnostics/Assert';
import { Engine } from '../../../Execution/Engine';
import { Graph } from '../../../Graphs/Graph';
import { EventNode } from '../../../Nodes/EventNode';
import { NodeDescription } from '../../../Nodes/Registry/NodeDescription';
import { Socket } from '../../../Sockets/Socket';
import { ILifecycleEventEmitter } from '../Abstractions/ILifecycleEventEmitter';

// inspired by: https://docs.unrealengine.com/4.27/en-US/ProgrammingAndScripting/Blueprints/UserGuide/Events/
export class LifecycleOnStart extends EventNode {
  public static Description = (lifecycleEventEmitter: ILifecycleEventEmitter) =>
    new NodeDescription(
      'lifecycle/onStart',
      'Event',
      'On Start',
      (description, graph) =>
        new LifecycleOnStart(description, graph, lifecycleEventEmitter)
    );

  constructor(
    description: NodeDescription,
    graph: Graph,
    private readonly lifecycleEventEmitter: ILifecycleEventEmitter
  ) {
    super(description, graph, [], [new Socket('flow', 'flow')]);
  }

  private onStartEvent: (() => void) | undefined = undefined;

  init(engine: Engine) {
    Assert.mustBeTrue(this.onStartEvent === undefined);
    this.onStartEvent = () => {
      engine.commitToNewFiber(this, 'flow');
    };

    this.lifecycleEventEmitter.startEvent.addListener(this.onStartEvent);
  }

  dispose(engine: Engine) {
    Assert.mustBeTrue(this.onStartEvent !== undefined);
    if (this.onStartEvent !== undefined) {
      this.lifecycleEventEmitter.startEvent.removeListener(this.onStartEvent);
    }
  }
}
