import { Graph } from '../../../Graphs/Graph.js';
import { FlowNode } from '../../../Nodes/FlowNode.js';
import { NodeEvalContext } from '../../../Nodes/NodeEvalContext.js';
import { NodeDescription } from '../../../Nodes/Registry/NodeDescription.js';
import { Socket } from '../../../Sockets/Socket.js';

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
      ],
      (context: NodeEvalContext) => {
        this.writeOutput('isOn', this.isOn);
        context.commit(this.isOn ? 'on' : 'off');
        this.isOn = !this.isOn;
      }
    );
  }
}
