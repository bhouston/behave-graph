import { Graph } from '../../..//Graphs/Graph';
import { ImmediateNode } from '../../..//Nodes/ImmediateNode';
import { Socket } from '../../..//Sockets/Socket';
import { EasingFunctions, EasingModes } from '../../../Easing';
import { NodeDescription } from '../../../Nodes/Registry/NodeDescription';

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
