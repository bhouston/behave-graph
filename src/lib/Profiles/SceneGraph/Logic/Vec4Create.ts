import { Node } from '../../../Nodes/Node';
import { NodeEvalContext } from '../../../Nodes/NodeEvalContext';
import { Socket } from '../../../Sockets/Socket';
import { Vec4 } from '../Values/Vec4';

export class Vec4Create extends Node {
  constructor() {
    super(
      'Logic',
      'logic/vec4Create',
      [
        new Socket('number', 'x'),
        new Socket('number', 'y'),
        new Socket('number', 'z'),
        new Socket('number', 'w')
      ],
      [new Socket('vec4', 'result')],
      (context: NodeEvalContext) => {
        context.writeOutput(
          'result',
          new Vec4(
            context.readInput('x'),
            context.readInput('y'),
            context.readInput('z'),
            context.readInput('w')
          )
        );
      }
    );
  }
}
