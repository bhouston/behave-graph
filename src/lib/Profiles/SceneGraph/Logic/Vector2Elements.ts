import { Vector2 } from 'three';

import Node from '../../../Nodes/Node';
import NodeEvalContext from '../../../Nodes/NodeEvalContext';
import Socket from '../../../Sockets/Socket';

export default class Vector2Elements extends Node {
  constructor() {
    super(
      'Logic',
      'logic/vector2Elements',
      [new Socket('vector2', 'value')],
      [new Socket('number', 'x'), new Socket('number', 'y')],
      (context: NodeEvalContext) => {
        const value = context.readInput('value') as Vector2;
        context.writeOutput('x', value.x);
        context.writeOutput('y', value.y);
      }
    );
  }
}
