import { Vector2 } from 'three';

import { Node } from '../../../Nodes/Node';
import { NodeEvalContext } from '../../../Nodes/NodeEvalContext';
import { Socket } from '../../../Sockets/Socket';
import { Vec2 } from '../Values/Vec2';

export class Vec2Elements extends Node {
  constructor() {
    super(
      'Logic',
      'logic/vec2Elements',
      [new Socket('vec2', 'value')],
      [new Socket('number', 'x'), new Socket('number', 'y')],
      (context: NodeEvalContext) => {
        const value = context.readInput('value') as Vec2;
        context.writeOutput('x', value.x);
        context.writeOutput('y', value.y);
      }
    );
  }
}
