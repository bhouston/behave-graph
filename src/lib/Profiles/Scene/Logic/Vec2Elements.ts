import { Node } from '../../../Nodes/Node.js';
import { NodeEvalContext } from '../../../Nodes/NodeEvalContext.js';
import { Socket } from '../../../Sockets/Socket.js';
import { Vec2 } from '../Values/Vec2.js';

export class Vec2Elements extends Node {
  constructor() {
    super(
      'Logic',
      'logic/elements/vec2',
      [new Socket('vec2', 'value')],
      [new Socket('float', 'x'), new Socket('float', 'y')],
      (context: NodeEvalContext) => {
        const value = context.readInput('value') as Vec2;
        context.writeOutput('x', value.x);
        context.writeOutput('y', value.y);
      }
    );
  }
}
