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
      [new Socket('flow', 'flow'), new Socket('float', 'duration')],
      [new Socket('flow', 'flow')]
    );
  }

  private isDisposed = false;
  private timeoutPending = false;

  triggered(
    engine: Engine,
    triggeringSocketName: string,
    finished: () => void
  ) {
    if (this.timeoutPending) {
      // enforce that only a single delay can be active at a time, intra-delay triggers are ignored
      return;
    }
    this.timeoutPending = true;
    setTimeout(() => {
      Assert.mustBeTrue(this.timeoutPending);
      if (this.isDisposed) {
        return;
      }
      this.timeoutPending = false;
      engine.commitToNewFiber(this, 'flow');
      finished();
    }, this.readInput<number>('duration') * 1000);
  }

  dispose() {
    Assert.mustBeTrue(!this.isDisposed);
    this.isDisposed = true;
  }
}
