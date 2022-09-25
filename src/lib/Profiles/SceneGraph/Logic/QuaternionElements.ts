import { Quaternion } from 'three';

import Node from '../../../Nodes/Node';
import NodeEvalContext from '../../../Nodes/NodeEvalContext';
import Socket from '../../../Sockets/Socket';

export default class QuaternionElements extends Node {
  constructor() {
    super(
      'Logic',
      'logic/quaternionElements',
      [
        new Socket('quaternion', 'value'),
      ],
      [
        new Socket('number', 'x'),
        new Socket('number', 'y'),
        new Socket('number', 'z'),
        new Socket('number', 'w'),
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
