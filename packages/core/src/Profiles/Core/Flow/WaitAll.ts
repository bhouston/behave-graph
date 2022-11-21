import { Fiber } from '../../../Execution/Fiber.js';
import { Graph } from '../../../Graphs/Graph.js';
import { FlowNode } from '../../../Nodes/FlowNode.js';
import { NodeDescription } from '../../../Nodes/Registry/NodeDescription.js';
import { Socket } from '../../../Sockets/Socket.js';

// this is equivalent to Promise.all()
export class WaitAll extends FlowNode {
  public static Description = new NodeDescription(
    'flow/waitAll',
    'Flow',
    'Wait All',
    (description, graph) => new WaitAll(description, graph)
  );

  private isOn = true;

  constructor(description: NodeDescription, graph: Graph) {
    super(
      description,
      graph,
      [
        new Socket('flow', '1'),
        new Socket('flow', '2'),
        new Socket('flow', 'reset'),
        new Socket('boolean', 'autoReset')
      ],
      [new Socket('flow', 'flow')]
    );
  }

  private aTriggered = false;
  private bTriggered = false;
  private outputTriggered = false;

  triggered(fiber: Fiber, triggeringSocketName: string) {
    switch (triggeringSocketName) {
      case '1': {
        this.aTriggered = true;
        break;
      }
      case '2': {
        this.bTriggered = true;
        break;
      }
      case 'reset': {
        this.aTriggered = false;
        this.bTriggered = false;
        this.outputTriggered = false;
        break;
      }
      default:
        throw new Error('should not get here');
    }

    // if a & b are triggered, first output!
    if (this.aTriggered && this.bTriggered && !this.outputTriggered) {
      fiber.commit(this, 'flow');
      this.outputTriggered = true;

      // auto-reset if required.
      if (this.readInput('autoReset') === true) {
        this.outputTriggered = false;
        this.aTriggered = false;
        this.bTriggered = false;
      }
    }
  }
}
