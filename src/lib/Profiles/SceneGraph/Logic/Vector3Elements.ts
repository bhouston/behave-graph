import { Vector3 } from 'three';

import Node from '../../../Nodes/Node';
import NodeEvalContext from '../../../Nodes/NodeEvalContext';
import Socket from '../../../Sockets/Socket';

export default class Vector3Elements extends Node {
  constructor() {
    super(
      'Logic',
      'logic/vector3Elements',
      [
        new Socket('vector3', 'value'),
      ],
      [
        new Socket('number', 'x'),
        new Socket('number', 'y'),
        new Socket('number', 'z'),
      ],
      (context: NodeEvalContext) => {
        const value = context.readInput('value') as Vector3;
        context.writeOutput('x', value.x);
        context.writeOutput('y', value.y);
        context.writeOutput('z', value.z);
      },
    );
  }
}
