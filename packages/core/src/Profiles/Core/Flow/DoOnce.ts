import { Fiber } from '../../../Execution/Fiber';
import { Graph } from '../../../Graphs/Graph';
import { FlowNode } from '../../../Nodes/FlowNode';
import { NodeDescription } from '../../../Nodes/Registry/NodeDescription';
import { Socket } from '../../../Sockets/Socket';

// based on Unreal Engine Blueprint DoN node

export class DoOnce extends FlowNode {
  public static Description = new NodeDescription(
    'flow/doOnce',
    'Flow',
    'DoOnce',
    (description, graph) => new DoOnce(description, graph)
  );

  constructor(description: NodeDescription, graph: Graph) {
    super(
      description,
      graph,
      [new Socket('flow', 'flow'), new Socket('flow', 'reset')],
      [new Socket('flow', 'flow')]
    );
  }

  private firedOnce = false;

  triggered(fiber: Fiber, triggeringSocketName: string) {
    if (triggeringSocketName === 'reset') {
      this.firedOnce = false;
      return;
    }
    if (triggeringSocketName === 'flow') {
      if (!this.firedOnce) {
        this.firedOnce = true;
        fiber.commit(this, 'flow');
      }
      return;
    }
    throw new Error('should not get here');
  }
}
