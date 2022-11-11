import { Fiber } from '../../../Execution/Fiber.js';
import { Graph } from '../../../Graphs/Graph.js';
import { FlowNode } from '../../../Nodes/FlowNode.js';
import { NodeDescription } from '../../../Nodes/Registry/NodeDescription.js';
import { Socket } from '../../../Sockets/Socket.js';

// based on Unreal Engine Blueprint Gate node

export class Gate extends FlowNode {
  public static Description = new NodeDescription(
    'flow/gate',
    'Flow',
    'Gate',
    (description, graph) => new Gate(description, graph)
  );

  constructor(description: NodeDescription, graph: Graph) {
    super(
      description,
      graph,
      [
        new Socket('flow', 'flow'),
        new Socket('flow', 'open'),
        new Socket('flow', 'close'),
        new Socket('flow', 'toggle'),
        new Socket('boolean', 'startClosed', true)
      ],
      [new Socket('flow', 'flow')]
    );
  }

  private isInitialized = false;
  private isClosed = true;

  triggered(fiber: Fiber, triggeringSocketName: string) {
    if (!this.isInitialized) {
      this.isClosed = this.readInput<boolean>('startClosed');
      this.isInitialized = true;
    }

    switch (triggeringSocketName) {
      case 'flow': {
        if (!this.isClosed) {
          fiber.commit(this, 'flow');
        }
        break;
      }
      case 'open': {
        this.isClosed = false;
        return;
      }
      case 'close': {
        this.isClosed = true;
        return;
      }
      case 'toggle': {
        this.isClosed = !this.isClosed;
        return;
      }
      default:
        new Error('should not get here');
    }
  }
}
