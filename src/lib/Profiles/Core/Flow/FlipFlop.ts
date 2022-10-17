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
    (nodeDescription, graph) => new FlipFlop(nodeDescription, graph)
  );

  private isOn = true;

  constructor(nodeDescription: NodeDescription, graph: Graph) {
    super(
      nodeDescription,
      graph,
      [new Socket('flow', 'flow')],
      [
        new Socket('flow', 'on'),
        new Socket('flow', 'off'),
        new Socket('boolean', 'isOn')
      ],
      (context: NodeEvalContext) => {
        context.writeOutput('isOn', this.isOn);
        context.commit(this.isOn ? 'on' : 'off');
        this.isOn = !this.isOn;
      }
    );
  }
}
