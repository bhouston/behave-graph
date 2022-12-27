import { Assert } from '../../../Diagnostics/Assert';
import { Fiber } from '../../../Execution/Fiber';
import { IGraph } from '../../../Graphs/Graph';
import { FlowNode } from '../../../Nodes/FlowNode';
import { NodeDescription } from '../../../Nodes/Registry/NodeDescription';
import { Socket } from '../../../Sockets/Socket';

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
