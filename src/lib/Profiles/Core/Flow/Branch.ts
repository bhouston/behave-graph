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
    (nodeDescription, graph) => new Branch(nodeDescription, graph)
  );

  constructor(nodeDescription: NodeDescription, graph: Graph) {
    super(
      nodeDescription,
      graph,
      [new Socket('flow', 'flow'), new Socket('boolean', 'condition')],
      [new Socket('flow', 'true'), new Socket('flow', 'false')],
      (context: NodeEvalContext) => {
        context.commit(
          context.readInput<boolean>('condition') === true ? 'true' : 'false'
        );
      }
    );
  }
}
