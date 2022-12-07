import { Fiber } from '../../../Execution/Fiber';
import { Graph } from '../../../Graphs/Graph';
import { FlowNode } from '../../../Nodes/FlowNode';
import { NodeDescription } from '../../../Nodes/Registry/NodeDescription';
import { Socket } from '../../../Sockets/Socket';

// this is equivalent to Promise.all()
export class WaitAll extends FlowNode {
  public static GetDescriptions(): NodeDescription[] {
    const descriptions: NodeDescription[] = [];
    for (let numOutputs = 1; numOutputs < 10; numOutputs++) {
      descriptions.push(
        new NodeDescription(
          `flow/waitAll/${numOutputs}`,
          'Flow',
          `Wait All ${numOutputs}`,
          (description, graph) => new WaitAll(description, graph, numOutputs)
        )
      );
    }
    return descriptions;
  }

  private isOn = true;

  constructor(
    description: NodeDescription,
    graph: Graph,
    private numOutputs: number
  ) {
    const inputs: Socket[] = [];
    for (let outputIndex = 1; outputIndex <= numOutputs; outputIndex++) {
      inputs.push(new Socket('flow', `${outputIndex}`));
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
    for (let outputIndex = 1; outputIndex <= this.numOutputs; outputIndex++) {
      this.triggeredMap[`${outputIndex}`] = false;
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
    if (this.triggeredCount === this.numOutputs && !this.outputTriggered) {
      fiber.commit(this, 'flow');
      this.outputTriggered = true;

      // auto-reset if required.
      if (this.read('autoReset') === true) {
        this.reset();
      }
    }
  }
}
