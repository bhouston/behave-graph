import { Fiber } from '../../../Execution/Fiber';
import { Graph } from '../../../Graphs/Graph';
import { FlowNode } from '../../../Nodes/FlowNode';
import { NodeDescription } from '../../../Nodes/Registry/NodeDescription';
import { Socket } from '../../../Sockets/Socket';

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
      if (this.count < Number(this.read<bigint>('n'))) {
        this.write('count', this.count);
        this.count++;
        fiber.commit(this, 'flow');
      }
      return;
    }
    throw new Error('should not get here');
  }
}
