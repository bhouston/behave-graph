import { Vector2 } from 'three';

import Node from '../../../Nodes/Node';
import NodeEvalContext from '../../../Nodes/NodeEvalContext';
import NumberSocket from '../../../Sockets/Typed/NumberSocket';
import Vector2Socket from '../Sockets/Vector2Socket';

export default class Vector2Elements extends Node {
  constructor() {
    super(
      'Logic',
      'logic/vector2Elements',
      [
        new Vector2Socket('value'),
      ],
      [
        new NumberSocket('x'),
        new NumberSocket('y'),
      ],
      (context: NodeEvalContext) => {
        const value = context.readInput('value') as Vector2;
        context.writeOutput('x', value.x);
        context.writeOutput('y', value.y);
      },
    );
  }
}
