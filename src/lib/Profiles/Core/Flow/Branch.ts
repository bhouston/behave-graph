import { Graph } from '../../../Graphs/Graph.js';
import { Node } from '../../../Nodes/Node.js';
import { NodeDescription } from '../../../Nodes/NodeDescription.js';
import { NodeEvalContext } from '../../../Nodes/NodeEvalContext.js';
import { Socket } from '../../../Sockets/Socket.js';

export class Branch extends Node {
  public static Description = new NodeDescription(
    'flow/branch',
    'Flow',
    'Branch',
    (description, graph) => new Branch(description, graph)
  );

  constructor(description: NodeDescription, graph: Graph) {
    super(
      description,
      graph,
      [new Socket('flow', 'flow'), new Socket('boolean', 'condition')],
      [new Socket('flow', 'true'), new Socket('flow', 'false')],
      (context: NodeEvalContext) => {
        context.commit(
          this.readInput<boolean>('condition') === true ? 'true' : 'false'
        );
      }
    );
  }
}
