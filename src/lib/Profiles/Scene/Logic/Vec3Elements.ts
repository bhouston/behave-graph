import { Node } from '../../../Nodes/Node.js';
import { NodeEvalContext } from '../../../Nodes/NodeEvalContext.js';
import { Socket } from '../../../Sockets/Socket.js';
import { Vec3 } from '../Values/Vec3.js';

export class Vec3Elements extends Node {
  constructor() {
    super(
      'Logic',
      'logic/vec3Elements',
      [new Socket('vec3', 'value')],
      [
        new Socket('float', 'x'),
        new Socket('float', 'y'),
        new Socket('float', 'z')
      ],
      (context: NodeEvalContext) => {
        const value = context.readInput('value') as Vec3;
        context.writeOutput('x', value.x);
        context.writeOutput('y', value.y);
        context.writeOutput('z', value.z);
      }
    );
  }
}
