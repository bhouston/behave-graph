import { Vector3 } from 'three';

import { Node } from '../../../Nodes/Node';
import { NodeEvalContext } from '../../../Nodes/NodeEvalContext';
import { Socket } from '../../../Sockets/Socket';
import { Vec3 } from '../Values/Vec3';

export class Vec3Create extends Node {
  constructor() {
    super(
      'Logic',
      'logic/vec3Create',
      [
        new Socket('number', 'x'),
        new Socket('number', 'y'),
        new Socket('number', 'z')
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
