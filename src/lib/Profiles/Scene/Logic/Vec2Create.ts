import { Node } from '../../../Nodes/Node.js';
import { NodeEvalContext } from '../../../Nodes/NodeEvalContext.js';
import { Socket } from '../../../Sockets/Socket.js';
import { Vec2 } from '../Values/Vec2.js';

export class Vec2Create extends Node {
  constructor() {
    super(
      'Logic',
      'logic/create/vec2',
      [new Socket('float', 'x'), new Socket('float', 'y')],
      [new Socket('vec2', 'result')],
      (context: NodeEvalContext) => {
        context.writeOutput(
          'result',
          new Vec2(context.readInput('x'), context.readInput('y'))
        );
      }
    );
  }
}
