import { Fiber } from '../../../Graphs/Execution/Fiber.js';
import { Graph } from '../../../Graphs/Graph.js';
import { FlowNode } from '../../../Nodes/FlowNode.js';
import { NodeDescription } from '../../../Nodes/Registry/NodeDescription.js';
import { Socket } from '../../../Sockets/Socket.js';

// https://docs.unrealengine.com/4.27/en-US/ProgrammingAndScripting/Blueprints/UserGuide/flow/

export class Sequence extends FlowNode {
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
      ]
    );
  }

  triggered(fiber: Fiber, triggeringSocketName: string) {
    // these outputs are fired sequentially in an sync fashion but without delays.
    // Thus a promise is returned and it continually returns a promise until each of the sequences has been executed.
    const sequenceIteration = (i: number) => {
      if (i < this.outputSockets.length) {
        const outputSocket = this.outputSockets[i];
        fiber.commit(this, outputSocket.name, () => {
          sequenceIteration(i + 1);
        });
      }
    };
    sequenceIteration(0);
  }
}
