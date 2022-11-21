import { Fiber } from '../../../Execution/Fiber.js';
import { Graph } from '../../../Graphs/Graph.js';
import { FlowNode } from '../../../Nodes/FlowNode.js';
import { NodeDescription } from '../../../Nodes/Registry/NodeDescription.js';
import { Socket } from '../../../Sockets/Socket.js';

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
        this.writeOutput('count', this.count);
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
