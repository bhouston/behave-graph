import { Fiber } from '../../../Execution/Fiber';
import { Graph } from '../../../Graphs/Graph';
import { FlowNode } from '../../../Nodes/FlowNode';
import { NodeDescription } from '../../../Nodes/Registry/NodeDescription';
import { Socket } from '../../../Sockets/Socket';

export class Counter extends FlowNode {
  public static Description = new NodeDescription(
    'flow/counter',
    'Flow',
    'Counter',
    (description, graph) => new Counter(description, graph)
  );

  constructor(description: NodeDescription, graph: Graph) {
    super(
      description,
      graph,
      [new Socket('flow', 'flow'), new Socket('flow', 'reset')],
      [new Socket('flow', 'flow'), new Socket('integer', 'count')]
    );
  }

  private count = 0;

  triggered(fiber: Fiber, triggeringSocketName: string) {
    switch (triggeringSocketName) {
      case 'flow': {
        this.count++;
        this.write('count', this.count);
        fiber.commit(this, 'flow');
        break;
      }
      case 'reset': {
        this.count = 0;
        break;
      }
      default:
        throw new Error('should not get here');
    }
  }
}
