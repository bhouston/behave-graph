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

export class SwitchOnInteger extends FlowNode {
  public static Description = new NodeDescription2({
    typeName: 'flow/switch/integer',
    category: 'Flow',
    label: 'Switch on Int',
    configuration: {
      cases: [0, 1, 2]
    },
    factory: (description, graph, configuration) =>
      new SwitchOnInteger(description, graph, configuration)
  });

  constructor(
    description: NodeDescription,
    graph: Graph,
    configuration: NodeConfiguration
  ) {
    const cases: number[] = configuration.cases;
    const outputs: Socket[] = [new Socket('flow', 'default')];
    for (let i = 0; i < cases.length; i++) {
      outputs.push(new Socket('flow', `${cases[i]}`));
    }

    super(
      description,
      graph,
      [new Socket('flow', 'flow'), new Socket('integer', 'selection')],
      outputs,
      configuration
    );
  }

  triggered(fiber: Fiber, triggeringSocketName: string) {
    const selection = this.readInput('selection');
    const cases: number[] = this.configuration.cases;
    for (let i = 0; i < cases.length; i++) {
      if (selection === cases[i]) {
        fiber.commit(this, `${cases[i]}`);
        return;
      }
    }
    fiber.commit(this, 'default');
  }
}
