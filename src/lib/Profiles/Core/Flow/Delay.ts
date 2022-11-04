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
      [new Socket('flow', 'flow')],
      (fiber, finished) => {
        let timeIsCancelled = false; // work around clearTimeout is not available on node.

        setTimeout(() => {
          if (timeIsCancelled) {
            return;
          }
          fiber.commit(this, 'flow');
          finished();
        }, this.readInput<number>('duration') * 1000);

        return () => {
          timeIsCancelled = true;
        };
      }
    );
  }
}
