import { Fiber } from '../../../Execution/Fiber';
import { Graph } from '../../../Graphs/Graph';
import { FlowNode } from '../../../Nodes/FlowNode';
import { NodeDescription } from '../../../Nodes/Registry/NodeDescription';
import { Socket } from '../../../Sockets/Socket';

export class FlipFlop extends FlowNode {
  public static Description = new NodeDescription(
    'flow/flipFlop',
    'Flow',
    'Flip Flop',
    (description, graph) => new FlipFlop(description, graph)
  );

  private isOn = true;

  constructor(description: NodeDescription, graph: Graph) {
    super(
      description,
      graph,
      [new Socket('flow', 'flow')],
      [
        new Socket('flow', 'on'),
        new Socket('flow', 'off'),
        new Socket('boolean', 'isOn')
      ]
    );
  }

  triggered(fiber: Fiber, triggeringSocketName: string) {
    this.writeOutput('isOn', this.isOn);
    fiber.commit(this, this.isOn ? 'on' : 'off');
    this.isOn = !this.isOn;
  }
}
