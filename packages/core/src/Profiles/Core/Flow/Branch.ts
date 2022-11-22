import { Fiber } from '../../../Execution/Fiber';
import { Graph } from '../../../Graphs/Graph';
import { FlowNode } from '../../../Nodes/FlowNode';
import { NodeDescription } from '../../../Nodes/Registry/NodeDescription';
import { Socket } from '../../../Sockets/Socket';

export class Branch extends FlowNode {
  public static Description = new NodeDescription(
    'flow/branch',
    'Flow',
    'Branch',
    (description, graph) => new Branch(description, graph)
  );

  constructor(description: NodeDescription, graph: Graph) {
    super(
      description,
      graph,
      [new Socket('flow', 'flow'), new Socket('boolean', 'condition')],
      [new Socket('flow', 'true'), new Socket('flow', 'false')]
    );
  }

  triggered(fiber: Fiber, triggeringSocketName: string) {
    fiber.commit(
      this,
      this.readInput<boolean>('condition') === true ? 'true' : 'false'
    );
  }
}
