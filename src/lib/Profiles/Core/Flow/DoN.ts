import { Fiber } from '../../../Execution/Fiber.js';
import { Graph } from '../../../Graphs/Graph.js';
import { FlowNode } from '../../../Nodes/FlowNode.js';
import { NodeDescription } from '../../../Nodes/Registry/NodeDescription.js';
import { Socket } from '../../../Sockets/Socket.js';

// based on Unreal Engine Blueprint DoN node

export class DoN extends FlowNode {
  public static Description = new NodeDescription(
    'flow/doN',
    'Flow',
    'DoN',
    (description, graph) => new DoN(description, graph)
  );

  constructor(description: NodeDescription, graph: Graph) {
    super(
      description,
      graph,
      [
        new Socket('flow', 'flow'),
        new Socket('integer', 'n', 1),
        new Socket('flow', 'reset')
      ],
      [new Socket('flow', 'flow'), new Socket('integer', 'count')]
    );
  }

  private count = 0;

  triggered(fiber: Fiber, triggeringSocketName: string) {
    if (triggeringSocketName === 'reset') {
      this.count = 0;
      return;
    }
    if (triggeringSocketName === 'flow') {
      if (this.count < Number(this.readInput<bigint>('n'))) {
        this.writeOutput('count', this.count);
        this.count++;
        fiber.commit(this, 'flow');
      }
      return;
    }
    throw new Error('should not get here');
  }
}
