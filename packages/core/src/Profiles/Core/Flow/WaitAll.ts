import { Fiber } from '../../../Execution/Fiber.js';
import { IGraph } from '../../../Graphs/Graph.js';
import { FlowNode } from '../../../Nodes/FlowNode.js';
import {
  NodeDescription,
  NodeDescription2
} from '../../../Nodes/Registry/NodeDescription.js';
import { Socket } from '../../../Sockets/Socket.js';

// this is equivalent to Promise.all()
export class WaitAll extends FlowNode {
  public static Description = new NodeDescription2({
    typeName: 'flow/waitAll',
    category: 'Flow',
    label: 'WaitAll',
    configuration: {
      numSockets: {
        valueType: 'number',
        defaultValue: 3
      }
    },
    factory: (description, graph, configuration) =>
      new WaitAll(description, graph, configuration.numSockets)
  });

  private isOn = true;

  constructor(
    description: NodeDescription,
    graph: IGraph,
    private numSockets: number
  ) {
    const inputs: Socket[] = [];
    for (let i = 1; i <= numSockets; i++) {
      inputs.push(new Socket('flow', `${i}`));
    }

    super(
      description,
      graph,
      [
        ...inputs,
        new Socket('flow', 'reset'),
        new Socket('boolean', 'autoReset')
      ],
      [new Socket('flow', 'flow')]
    );

    this.reset();
  }

  private triggeredMap: { [key: string]: boolean } = {};
  private triggeredCount = 0;
  private outputTriggered = false;

  private reset() {
    for (let inputIndex = 1; inputIndex <= this.numSockets; inputIndex++) {
      this.triggeredMap[`${inputIndex}`] = false;
    }
    this.triggeredCount = 0;
    this.outputTriggered = false;
  }

  triggered(fiber: Fiber, triggeringSocketName: string) {
    if (triggeringSocketName === 'reset') {
      this.reset();
      return;
    }

    if (this.triggeredMap[triggeringSocketName]) {
      return;
    }

    this.triggeredMap[triggeringSocketName] = true;
    this.triggeredCount++;

    // if a & b are triggered, first output!
    if (this.triggeredCount === this.numSockets && !this.outputTriggered) {
      fiber.commit(this, 'flow');
      this.outputTriggered = true;

      // auto-reset if required.
      if (this.readInput('autoReset') === true) {
        this.reset();
      }
    }
  }
}
