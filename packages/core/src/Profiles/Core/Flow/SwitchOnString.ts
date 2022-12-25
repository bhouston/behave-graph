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

export class SwitchOnString extends FlowNode {
  public static Description = new NodeDescription2({
    typeName: 'flow/switch/string',
    category: 'Flow',
    label: 'Switch on String',
    configuration: {
      cases: ['a', 'b', 'c']
    },
    factory: (description, graph, configuration) =>
      new SwitchOnString(description, graph, configuration)
  });

  constructor(
    description: NodeDescription,
    graph: Graph,
    configuration: NodeConfiguration
  ) {
    const cases: string[] = configuration.cases;
    const outputs: Socket[] = [new Socket('flow', 'default')];
    for (let i = 0; i < cases.length; i++) {
      outputs.push(new Socket('flow', `${cases[i]}`));
    }

    super(
      description,
      graph,
      [new Socket('flow', 'flow'), new Socket('string', 'selection')],
      outputs,
      configuration
    );
  }

  triggered(fiber: Fiber, triggeringSocketName: string) {
    const selection = this.readInput<string>('selection');
    const cases: string[] = this.configuration.cases;
    for (let i = 0; i < cases.length; i++) {
      if (selection === cases[i]) {
        fiber.commit(this, `${cases[i]}`);
        return;
      }
    }
    fiber.commit(this, 'default');
  }
}
