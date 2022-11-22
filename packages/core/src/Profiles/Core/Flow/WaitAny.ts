import { Fiber } from '../../../Execution/Fiber';
import { Graph } from '../../../Graphs/Graph';
import { FlowNode } from '../../../Nodes/FlowNode';
import { NodeDescription } from '../../../Nodes/Registry/NodeDescription';
import { Socket } from '../../../Sockets/Socket';

// this is equivalent to Promise.any()
export class WaitAny extends FlowNode {
  public static Description = new NodeDescription(
    'flow/waitAny',
    'Flow',
    'Wait Any',
    (description, graph) => new WaitAny(description, graph)
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

  private inputTriggered = false;
  private outputTriggered = false;

  triggered(fiber: Fiber, triggeringSocketName: string) {
    switch (triggeringSocketName) {
      case '1':
      case '2': {
        this.inputTriggered = true;
        break;
      }
      case 'reset': {
        this.inputTriggered = false;
        this.outputTriggered = false;
        break;
      }
      default:
        throw new Error('should not get here');
    }

    // if any input triggered, first output!
    if (this.inputTriggered && !this.outputTriggered) {
      fiber.commit(this, 'flow');
      this.outputTriggered = true;

      // auto-reset if required.
      if (this.readInput('autoReset') === true) {
        this.outputTriggered = false;
        this.inputTriggered = false;
      }
    }
  }
}
