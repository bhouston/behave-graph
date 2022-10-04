import { Quaternion } from 'three';

import { Node } from '../../../Nodes/Node';
import { NodeEvalContext } from '../../../Nodes/NodeEvalContext';
import { Socket } from '../../../Sockets/Socket';

export class Vec4Elements extends Node {
  constructor() {
    super(
      'Logic',
      'logic/vec4Elements',
      [new Socket('vec4', 'value')],
      [
        new Socket('number', 'x'),
        new Socket('number', 'y'),
        new Socket('number', 'z'),
        new Socket('number', 'w')
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
