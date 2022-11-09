import { Fiber } from '../../../Graphs/Execution/Fiber.js';
import { Graph } from '../../../Graphs/Graph.js';
import { FlowNode } from '../../../Nodes/FlowNode.js';
import { NodeDescription } from '../../../Nodes/Registry/NodeDescription.js';
import { Socket } from '../../../Sockets/Socket.js';

export class ForLoop extends FlowNode {
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
      ]
    );
  }

  triggered(fiber: Fiber, triggeringSocketName: string) {
    // these outputs are fired sequentially in an async fashion but without delays.
    // Thus a promise is returned and it continually returns a promise until each of the sequences has been executed.
    const startIndex = this.readInput<bigint>('startIndex');
    const endIndex = this.readInput<bigint>('endIndex');
    const loopBodyIteration = (i: bigint) => {
      if (i < endIndex) {
        this.writeOutput('index', i);
        fiber.commit(this, 'loopBody', () => {
          loopBodyIteration(i + 1n);
        });
      } else {
        fiber.commit(this, 'completed');
      }
    };
    loopBodyIteration(startIndex);
  }
}
