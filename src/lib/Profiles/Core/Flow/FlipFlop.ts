import { Graph } from '../../../Graphs/Graph.js';
import { Node } from '../../../Nodes/Node.js';
import { NodeDescription } from '../../../Nodes/NodeDescription.js';
import { NodeEvalContext } from '../../../Nodes/NodeEvalContext.js';
import { Socket } from '../../../Sockets/Socket.js';

export class FlipFlop extends Node {
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
