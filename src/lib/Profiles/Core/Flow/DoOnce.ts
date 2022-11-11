import { Fiber } from '../../../Execution/Fiber.js';
import { Graph } from '../../../Graphs/Graph.js';
import { FlowNode } from '../../../Nodes/FlowNode.js';
import { NodeDescription } from '../../../Nodes/Registry/NodeDescription.js';
import { Socket } from '../../../Sockets/Socket.js';

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
