import { Vector3 } from 'three';

import Node from '../../../Nodes/Node';
import NodeEvalContext from '../../../Nodes/NodeEvalContext';
import NumberSocket from '../../../Sockets/Typed/NumberSocket';
import Vector3Socket from '../Sockets/Vector3Socket';

export default class Vector3Elements extends Node {
  constructor() {
    super(
      'Logic',
      'three/vector3GetXYZ',
      [
        new Vector3Socket('value'),
      ],
      [
        new NumberSocket('x'),
        new NumberSocket('y'),
        new NumberSocket('z'),
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
