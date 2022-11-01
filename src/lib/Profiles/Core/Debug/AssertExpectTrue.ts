import { Assert } from '../../../Diagnostics/Assert.js';
import { Graph } from '../../../Graphs/Graph.js';
import { Node } from '../../../Nodes/Node.js';
import { NodeDescription } from '../../../Nodes/NodeDescription.js';
import { NodeEvalContext } from '../../../Nodes/NodeEvalContext.js';
import { Socket } from '../../../Sockets/Socket.js';

export class ExpectTrue extends Node {
  public static Description = new NodeDescription(
    'debug/expectTrue',
    'Action',
    'Assert Expect True',
    (description, graph) => new ExpectTrue(description, graph)
  );

  constructor(description: NodeDescription, graph: Graph) {
    super(
      description,
      graph,
      [
        new Socket('flow', 'flow'),
        new Socket('boolean', 'condition'),
        new Socket('string', 'description')
      ],
      [new Socket('flow', 'flow')],
      (context: NodeEvalContext) => {
        Assert.mustBeTrue(
          this.readInput('condition'),
          this.readInput('description')
        );
      }
    );
  }
}
