import { Assert } from '../../../Diagnostics/Assert.js';
import { Fiber } from '../../../Execution/Fiber.js';
import { IGraph } from '../../../Graphs/Graph.js';
import { FlowNode } from '../../../Nodes/FlowNode.js';
import { NodeDescription } from '../../../Nodes/Registry/NodeDescription.js';
import { Socket } from '../../../Sockets/Socket.js';

export class ExpectTrue extends FlowNode {
  public static Description = new NodeDescription(
    'debug/expectTrue',
    'Action',
    'Assert Expect True',
    (description, graph) => new ExpectTrue(description, graph)
  );

  constructor(description: NodeDescription, graph: IGraph) {
    super(
      description,
      graph,
      [
        new Socket('flow', 'flow'),
        new Socket('boolean', 'condition'),
        new Socket('string', 'description')
      ],
      [new Socket('flow', 'flow')]
    );
  }

  triggered(fiber: Fiber, triggeredSocketName: string) {
    Assert.mustBeTrue(
      this.readInput('condition'),
      this.readInput('description')
    );
    fiber.commit(this, 'flow');
  }
}
