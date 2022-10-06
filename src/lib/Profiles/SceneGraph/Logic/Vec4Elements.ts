import { Node } from '../../../Nodes/Node';
import { NodeEvalContext } from '../../../Nodes/NodeEvalContext';
import { Socket } from '../../../Sockets/Socket';
import { Vec4 } from '../Values/Vec4';

export class Vec4Elements extends Node {
  constructor() {
    super(
      'Logic',
      'logic/vec4Elements',
      [new Socket('vec4', 'value')],
      [
        new Socket('float', 'x'),
        new Socket('float', 'y'),
        new Socket('float', 'z'),
        new Socket('float', 'w')
      ],
      (context: NodeEvalContext) => {
        const value = context.readInput('value') as Vec4;
        context.writeOutput('x', value.x);
        context.writeOutput('y', value.y);
        context.writeOutput('z', value.z);
        context.writeOutput('w', value.w);
      }
    );
  }
}
