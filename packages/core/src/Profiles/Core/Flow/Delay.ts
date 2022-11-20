import { Engine } from '../../../Execution/Engine.js';
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
      [new Socket('flow', 'flow'), new Socket('float', 'duration', 1)],
      [new Socket('flow', 'flow')]
    );
  }

  private timeoutPending = false;

  triggered(
    engine: Engine,
    triggeringSocketName: string,
    finished: () => void
  ) {
    // if there is a valid timeout running, leave it.
    if (this.timeoutPending) {
      return;
    }

    // otherwise start it.
    this.timeoutPending = true;
    setTimeout(() => {
      // check if cancelled
      if (!this.timeoutPending) return;
      this.timeoutPending = false;
      engine.commitToNewFiber(this, 'flow');
      finished();
    }, this.readInput<number>('duration') * 1000);
  }

  dispose() {
    this.timeoutPending = false;
  }
}
