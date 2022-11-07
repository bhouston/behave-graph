/*
import { Fiber } from '../../../Graphs/Execution/Fiber.js';
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

  private triggerCount = 0;
  private isCancelled = -1;
  private timeoutPending = false;

  triggered(engine: Engine, triggeringSocketName: string, finished: () => void) {
    if (this.timeoutPending) {
      // enforce that only a single delay can be active at a time, intra-delay triggers are ignored
      return;
    }
    this.triggerCount++;

    const localTriggerCount = this.triggerCount;
    this.timeoutPending = true;
    setTimeout(() => {
      this.timeoutPending = false;
      if (this.isCancelled >= localTriggerCount) {
        // cancel only the delay that was running prior to the cancel trigger, not subsequent ones
        return;
      }

      fiber.commit(this, 'flow');
      finished();
    }, this.readInput<number>('duration') * 1000);
  }

  dispose() {
    this.isCancelled = this.triggerCount; // using this version based method of cancelling as "clearTimeout" is not available everywhere.
  }
}
*/
