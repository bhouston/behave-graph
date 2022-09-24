import { Vector3 } from 'three';

import Node from '../../../Nodes/Node';
import NodeEvalContext from '../../../Nodes/NodeEvalContext';
import NumberSocket from '../../../Sockets/Typed/NumberSocket';
import Vector3Socket from '../Sockets/Vector3Socket';

export default class Vector3Create extends Node {
  constructor() {
    super(
      'Logic',
      'logic/vector3Create',
      [
        new NumberSocket('x'),
        new NumberSocket('y'),
        new NumberSocket('z'),
      ],
      [
        new Vector3Socket('result'),
      ],
      (context: NodeEvalContext) => {
        context.writeOutput('result', new Vector3(context.readInput('x'), context.readInput('y'), context.readInput('z')));
      },
    );
  }
}
