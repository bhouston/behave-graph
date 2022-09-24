import { Quaternion } from 'three';

import Node from '../../../Nodes/Node';
import NodeEvalContext from '../../../Nodes/NodeEvalContext';
import NumberSocket from '../../../Sockets/Typed/NumberSocket';
import QuaternionSocket from '../Sockets/QuaternionSocket';

export default class QuaternionCreate extends Node {
  constructor() {
    super(
      'Logic',
      'three/vector3Create',
      [
        new NumberSocket('x'),
        new NumberSocket('y'),
        new NumberSocket('z'),
        new NumberSocket('w'),
      ],
      [
        new QuaternionSocket('result'),
      ],
      (context: NodeEvalContext) => {
        context.writeOutput('result', new Quaternion(context.readInput('x'), context.readInput('y'), context.readInput('z'), context.readInput('w')));
      },
    );
  }
}
