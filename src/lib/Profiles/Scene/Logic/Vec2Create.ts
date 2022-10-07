import { Node } from '../../../Nodes/Node';
import { NodeEvalContext } from '../../../Nodes/NodeEvalContext';
import { Socket } from '../../../Sockets/Socket';
import { Vec2 } from '../Values/Vec2';

export class Vec2Create extends Node {
  constructor() {
    super(
      'Logic',
      'logic/vec2Create',
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
