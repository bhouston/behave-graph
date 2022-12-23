import { NodeConfiguration } from 'packages/core/src/Nodes/Node';

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
  public static Description = new NodeDescription2({
    typeName: 'flow/sequence',
    category: 'Flow',
    label: 'Sequence',
    configuration: {
      numOutputs: {
        valueType: 'number'
      }
    },
    factory: (description, graph, configuration) =>
      new Sequence(description, graph, configuration)
  });

  constructor(
    description: NodeDescription,
    graph: Graph,
    configuration: NodeConfiguration
  ) {
    const outputs: Socket[] = [];
    const numOutputs = configuration.numOutputs;
    for (let outputIndex = 1; outputIndex <= numOutputs; outputIndex++) {
      outputs.push(new Socket('flow', `${outputIndex}`));
    }
    super(description, graph, [new Socket('flow', 'flow')], outputs);
  }

  triggered(fiber: Fiber, triggeringSocketName: string) {
    // these outputs are fired sequentially in an sync fashion but without delays.
    // Thus a promise is returned and it continually returns a promise until each of the sequences has been executed.
    const sequenceIteration = (i: number) => {
      if (i < this.outputs.length) {
        const outputSocket = this.outputs[i];
        fiber.commit(this, outputSocket.name, () => {
          sequenceIteration(i + 1);
        });
      }
    };
    sequenceIteration(0);
  }
}
