import { Graph } from '../../..//Graphs/Graph.js';
import { ImmediateNode } from '../../..//Nodes/ImmediateNode.js';
import { Socket } from '../../..//Sockets/Socket.js';
import { EasingFunctions, EasingModes } from '../../../Easing.js';
import { NodeDescription } from '../../../Nodes/Registry/NodeDescription.js';

export class Easing extends ImmediateNode {
  public static Description = new NodeDescription(
    'math/easing',
    'Logic',
    'Easing',
    (description: NodeDescription, graph: Graph) =>
      new Easing(description, graph)
  );

  constructor(description: NodeDescription, graph: Graph) {
    super(
      description,
      graph,
      [
        new Socket(
          'string',
          'easingFunction',
          'linear',
          undefined,
          Object.keys(EasingFunctions)
        ),
        new Socket(
          'string',
          'easingMode',
          'inOut',
          undefined,
          Object.keys(EasingModes)
        ),
        new Socket('float', 't')
      ],
      [new Socket('float', 't')],
      () => {
        const easingFunction =
          EasingFunctions[this.readInput('easingFunction') as string];
        const easingMode = EasingModes[this.readInput('easingMode') as string];
        const inputT = this.readInput('t') as number;
        const easing = easingMode(easingFunction);
        this.writeOutput('t', easing(inputT));
      }
    );
  }
}
