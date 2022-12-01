import { Fiber } from '../../../Execution/Fiber';
import { Graph } from '../../../Graphs/Graph';
import { FlowNode } from '../../../Nodes/FlowNode';
import {
  NodeDescription,
  NodeDescription2
} from '../../../Nodes/Registry/NodeDescription';
import { Socket } from '../../../Sockets/Socket';

// https://docs.unrealengine.com/4.27/en-US/ProgrammingAndScripting/Blueprints/UserGuide/flow/

export class Sequence extends FlowNode {
  public static GetDescriptions(): NodeDescription[] {
    const descriptions: NodeDescription[] = [];
    for (let numOutputs = 1; numOutputs < 10; numOutputs++) {
      descriptions.push(
        new NodeDescription2({
          typeName: `flow/sequence/${numOutputs}`,
          category: 'Flow',
          label: `Sequence ${numOutputs}`,
          factory: (description, graph) =>
            new Sequence(description, graph, numOutputs),
          otherTypeNames: numOutputs === 3 ? ['flow/sequence'] : [] // old sequence node has 3 outputs
        })
      );
    }
    return descriptions;
  }

  constructor(
    description: NodeDescription,
    graph: Graph,
    private numOutputs: number
  ) {
    const outputSockets: Socket[] = [];
    for (let outputIndex = 1; outputIndex <= numOutputs; outputIndex++) {
      outputSockets.push(new Socket('flow', `${outputIndex}`));
    }
    super(description, graph, [new Socket('flow', 'flow')], outputSockets);
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
