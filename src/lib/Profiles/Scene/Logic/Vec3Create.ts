import { Node } from '../../../Nodes/Node.js';
import { NodeEvalContext } from '../../../Nodes/NodeEvalContext.js';
import { Socket } from '../../../Sockets/Socket.js';
import { Vec3 } from '../Values/Vec3.js';

export class Vec3Create extends Node {
  constructor() {
    super(
      'Logic',
      'logic/vec3',
      [
        new Socket('float', 'x'),
        new Socket('float', 'y'),
        new Socket('float', 'z')
      ],
      [new Socket('vec3', 'result')],
      (context: NodeEvalContext) => {
        context.writeOutput(
          'result',
          new Vec3(
            context.readInput('x'),
            context.readInput('y'),
            context.readInput('z')
          )
        );
      }
    );
  }
}
