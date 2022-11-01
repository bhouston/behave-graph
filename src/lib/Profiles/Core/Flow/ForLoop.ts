import { Graph } from '../../../Graphs/Graph.js';
import { Node } from '../../../Nodes/Node.js';
import { NodeDescription } from '../../../Nodes/NodeDescription.js';
import { NodeEvalContext } from '../../../Nodes/NodeEvalContext.js';
import { Socket } from '../../../Sockets/Socket.js';

export class ForLoop extends Node {
  public static Description = new NodeDescription(
    'flow/forLoop',
    'Flow',
    'For Loop',
    (description, graph) => new ForLoop(description, graph)
  );

  constructor(description: NodeDescription, graph: Graph) {
    super(
      description,
      graph,
      [
        new Socket('flow', 'flow'),
        new Socket('integer', 'startIndex'),
        new Socket('integer', 'endIndex')
      ],
      [
        new Socket('flow', 'loopBody'),
        new Socket('integer', 'index'),
        new Socket('flow', 'completed')
      ],
      (context: NodeEvalContext) => {
        // these outputs are fired sequentially in an async fashion but without delays.
        // Thus a promise is returned and it continually returns a promise until each of the sequences has been executed.
        const startIndex = this.readInput<bigint>('startIndex');
        const endIndex = this.readInput<bigint>('endIndex');
        const loopBodyIteration = (i: bigint) => {
          if (i < endIndex) {
            this.writeOutput('index', i);
            context.commit('loopBody', () => {
              loopBodyIteration(i + 1n);
            });
          } else {
            context.commit('completed');
          }
        };
        loopBodyIteration(startIndex);
      }
    );
  }
}
