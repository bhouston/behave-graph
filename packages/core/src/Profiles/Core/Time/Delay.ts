import { Engine } from '../../../Execution/Engine.js';
import { IGraphApi } from '../../../Graphs/Graph.js';
import { AsyncNode } from '../../../Nodes/AsyncNode.js';
import {
  NodeDescription,
  NodeDescription2
} from '../../../Nodes/Registry/NodeDescription';
import { Socket } from '../../../Sockets/Socket.js';

// ASYNC - asynchronous evaluation
// also called "delay"

export class Delay extends AsyncNode {
  public static Description = new NodeDescription2({
    typeName: 'time/delay',
    otherTypeNames: ['flow/delay'],
    category: 'Time',
    label: 'Delay',
    factory: (description, graph) => new Delay(description, graph)
  });

  constructor(description: NodeDescription, graph: IGraphApi) {
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
