import { Graph } from '../../../Graphs/Graph.js';
import { Node } from '../../../Nodes/Node.js';
import { NodeDescription } from '../../../Nodes/NodeDescription.js';
import { NodeEvalContext } from '../../../Nodes/NodeEvalContext.js';
import { Socket } from '../../../Sockets/Socket.js';

// ASYNC - asynchronous evaluation
// also called "delay"

export class Delay extends Node {
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
      (context: NodeEvalContext) => {
        console.log('DELAYED');
        let timeIsCancelled = false; // work around clearTimeout is not available on node.

        setTimeout(() => {
          if (timeIsCancelled) {
            return;
          }
          context.commit('flow');
          context.finish();
        }, context.readInput<number>('duration') * 1000);

        context.onAsyncCancelled.addListener(() => {
          timeIsCancelled = true;
        });
      }
    );

    this.async = true;
  }
}
