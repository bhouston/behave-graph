import { Assert } from '../../../Diagnostics/Assert.js';
import { Engine } from '../../../Graphs/Execution/Engine.js';
import { Graph } from '../../../Graphs/Graph.js';
import { AsyncNode } from '../../../Nodes/AsyncNode.js';
import { NodeDescription } from '../../../Nodes/Registry/NodeDescription.js';
import { Socket } from '../../../Sockets/Socket.js';

// ASYNC - asynchronous evaluation
// also called "delay"

export class Delay extends AsyncNode {
  public static Description = new NodeDescription(
    'flow/delay',
    'Flow',
    'Delay',
    (description, graph) => new Delay(description, graph)
  );

  constructor(description: NodeDescription, graph: Graph) {
    super(
      description,
      graph,
      [
        new Socket('flow', 'flow'),
        new Socket('float', 'duration'),
        new Socket('flow', 'cancel')
      ],
      [new Socket('flow', 'flow')]
    );
  }

  private triggerVersion = 0;
  private timeoutPending = false;

  triggered(
    engine: Engine,
    triggeringSocketName: string,
    finished: () => void
  ) {
    // if cancelling, just increment triggerVersion and do not set a timer. :)
    if (triggeringSocketName === 'cancel') {
      if (this.timeoutPending) {
        this.triggerVersion++;
        this.timeoutPending = false;
      }
      return;
    }

    // if there is a valid timeout running, leave it.
    if (this.timeoutPending) {
      return;
    }

    // otherwise start it.
    this.triggerVersion++;
    const localTriggerCount = this.triggerVersion;
    this.timeoutPending = true;
    setTimeout(() => {
      if (this.triggerVersion !== localTriggerCount) {
        return;
      }
      Assert.mustBeTrue(this.timeoutPending);
      this.timeoutPending = false;
      engine.commitToNewFiber(this, 'flow');
      finished();
    }, this.readInput<number>('duration') * 1000);
  }

  dispose() {
    this.triggerVersion++; // equivalent to 'cancel' trigger behavior.
    this.timeoutPending = false;
  }
}
