import { Fiber } from '../../../Execution/Fiber';
import { Graph } from '../../../Graphs/Graph';
import { FlowNode } from '../../../Nodes/FlowNode';
import {
  NodeDescription,
  NodeDescription2
} from '../../../Nodes/Registry/NodeDescription';
import { Socket } from '../../../Sockets/Socket';

export class ForLoop extends FlowNode {
  public static Description = new NodeDescription2({
    typeName: 'flow/forLoop',
    category: 'Flow',
    label: 'For Loop',
    factory: (description, graph) => new ForLoop(description, graph)
  });

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
          loopBodyIteration(i + BigInt(1));
        });
      } else {
        fiber.commit(this, 'completed');
      }
    };
    loopBodyIteration(startIndex);
  }
}
