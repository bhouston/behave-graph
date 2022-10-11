import { Node } from '../../../Nodes/Node.js';
import { NodeEvalContext } from '../../../Nodes/NodeEvalContext.js';
import { Socket } from '../../../Sockets/Socket.js';
import { Vec4 } from '../Values/Vec4.js';

export class Vec4Create extends Node {
  constructor() {
    super(
      'Logic',
      'logic/create/vec4',
      [
        new Socket('float', 'x'),
        new Socket('float', 'y'),
        new Socket('float', 'z'),
        new Socket('float', 'w')
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
