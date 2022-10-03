import { Quaternion } from 'three';

import { Node } from '../../../Nodes/Node';
import { NodeEvalContext } from '../../../Nodes/NodeEvalContext';
import { Socket } from '../../../Sockets/Socket';

export class QuaternionCreate extends Node {
  constructor() {
    super(
      'Logic',
      'logic/quaternionCreate',
      [
        new Socket('number', 'x'),
        new Socket('number', 'y'),
        new Socket('number', 'z'),
        new Socket('number', 'w')
      ],
      [new Socket('quaternion', 'result')],
      (context: NodeEvalContext) => {
        context.writeOutput(
          'result',
          new Quaternion(
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
