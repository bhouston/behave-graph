import { Fiber } from '../../../Execution/Fiber';
import { Graph } from '../../../Graphs/Graph';
import { FlowNode } from '../../../Nodes/FlowNode';
import {
  NodeDescription,
  NodeDescription2
} from '../../../Nodes/Registry/NodeDescription';
import { Socket } from '../../../Sockets/Socket';

export class Branch extends FlowNode {
  public static Description = new NodeDescription2({
    typeName: 'flow/branch',
    category: 'Flow',
    label: 'Branch',
    factory: (description, graph) => new Branch(description, graph),
    helpDescription:
      "Checks the value of the 'condition' input and if true, executes the 'true' branch, otherwise it executes the 'false' branch."
  });

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
      this.read<boolean>('condition') === true ? 'true' : 'false'
    );
  }
}
