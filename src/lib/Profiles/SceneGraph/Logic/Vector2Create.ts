import { Vector2 } from 'three';

import Node from '../../../Nodes/Node';
import NodeEvalContext from '../../../Nodes/NodeEvalContext';
import Socket from '../../../Sockets/Socket';

export default class Vector2Create extends Node {
  constructor() {
    super(
      'Logic',
      'logic/vector2Create',
      [
        new Socket('number', 'x'),
        new Socket('number', 'y'),
      ],
      [
        new Socket('vector2', 'result'),
      ],
      (context: NodeEvalContext) => {
        context.writeOutput('result', new Vector2(context.readInput('x'), context.readInput('y')));
      },
    );
  }
}
