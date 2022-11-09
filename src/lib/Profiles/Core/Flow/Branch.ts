import { Fiber } from '../../../Execution/Fiber.js';
import { Graph } from '../../../Graphs/Graph.js';
import { FlowNode } from '../../../Nodes/FlowNode.js';
import { NodeDescription } from '../../../Nodes/Registry/NodeDescription.js';
import { Socket } from '../../../Sockets/Socket.js';

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
