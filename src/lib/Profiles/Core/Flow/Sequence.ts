import { Graph } from '../../../Graphs/Graph.js';
import { AsyncFlowNode } from '../../../Nodes/AsyncFlowNode.js';
import { NodeDescription } from '../../../Nodes/NodeDescription.js';
import { NodeEvalContext } from '../../../Nodes/NodeEvalContext.js';
import { Socket } from '../../../Sockets/Socket.js';

// https://docs.unrealengine.com/4.27/en-US/ProgrammingAndScripting/Blueprints/UserGuide/flow/

export class Sequence extends AsyncFlowNode {
  public static Description = new NodeDescription(
    'flow/sequence',
    'Flow',
    'Sequence',
    (description, graph) => new Sequence(description, graph)
  );

  constructor(description: NodeDescription, graph: Graph) {
    super(
      description,
      graph,
      [new Socket('flow', 'flow')],
      [
        new Socket('flow', '1'),
        new Socket('flow', '2'),
        new Socket('flow', '3')
      ],
      (context: NodeEvalContext) => {
        // these outputs are fired sequentially in an async fashion but without delays.
        // Thus a promise is returned and it continually returns a promise until each of the sequences has been executed.
        const sequenceIteration = function sequenceIteration(i: number) {
          if (i < context.node.outputSockets.length) {
            const outputSocket = context.node.outputSockets[i];
            context.commit(outputSocket.name, () => {
              sequenceIteration(i + 1);
            });
          }
        };
        sequenceIteration(0);
      }
    );
  }
}
