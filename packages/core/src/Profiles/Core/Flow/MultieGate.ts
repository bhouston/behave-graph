import { Fiber } from '../../../Execution/Fiber';
import { Graph } from '../../../Graphs/Graph';
import { FlowNode } from '../../../Nodes/FlowNode';
import { NodeDescription } from '../../../Nodes/Registry/NodeDescription';
import { Socket } from '../../../Sockets/Socket';

// https://docs.unrealengine.com/4.27/en-US/ProgrammingAndScripting/Blueprints/UserGuide/flow/

export class MultiGate extends FlowNode {
  public static Description = new NodeDescription(
    'flow/multiGate',
    'Flow',
    'MultiGate',
    (description, graph) => new MultiGate(description, graph)
  );

  constructor(description: NodeDescription, graph: Graph) {
    super(
      description,
      graph,
      [
        new Socket('flow', 'flow'),
        new Socket('flow', 'reset'),
        new Socket('boolean', 'loop', true),
        new Socket('integer', 'startIndex', 0)
      ],
      [
        new Socket('flow', '1'),
        new Socket('flow', '2'),
        new Socket('flow', '3')
      ]
    );
  }

  private isInitialized = false;
  private nextIndex = 0;

  triggered(fiber: Fiber, triggeringSocketName: string) {
    if (!this.isInitialized) {
      this.nextIndex = Number(this.readInput('startIndex'));
    }

    if (this.readInput<boolean>('loop')) {
      this.nextIndex = this.nextIndex % this.outputs.length;
    }

    switch (triggeringSocketName) {
      case 'reset': {
        this.nextIndex = 0;
        return;
      }
      case 'flow': {
        if (0 <= this.nextIndex && this.nextIndex < this.outputs.length) {
          fiber.commit(this, this.outputs[this.nextIndex].name);
        }
        this.nextIndex++;
        return;
      }
    }
    // these outputs are fired sequentially in an sync fashion but without delays.
    // Thus a promise is returned and it continually returns a promise until each of the sequences has been executed.
    const sequenceIteration = (i: number) => {
      if (i < this.outputs.length) {
        const outputSocket = this.outputs[i];
        fiber.commit(this, outputSocket.name, () => {
          sequenceIteration(i + 1);
        });
      }
    };
    sequenceIteration(0);
  }
}
