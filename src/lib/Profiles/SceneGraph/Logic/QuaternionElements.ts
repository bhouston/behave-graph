import { Quaternion } from 'three';

import Node from '../../../Nodes/Node';
import NodeEvalContext from '../../../Nodes/NodeEvalContext';
import NumberSocket from '../../../Sockets/Typed/NumberSocket';
import QuaternionSocket from '../Sockets/QuaternionSocket';

export default class QuaternionElements extends Node {
  constructor() {
    super(
      'Logic',
      'logic/quaternionElements',
      [
        new QuaternionSocket('value'),
      ],
      [
        new NumberSocket('x'),
        new NumberSocket('y'),
        new NumberSocket('z'),
        new NumberSocket('w'),
      ],
      (context: NodeEvalContext) => {
        const value = context.readInput('value') as Quaternion;
        context.writeOutput('x', value.x);
        context.writeOutput('y', value.y);
        context.writeOutput('z', value.z);
        context.writeOutput('w', value.w);
      },
    );
  }
}
