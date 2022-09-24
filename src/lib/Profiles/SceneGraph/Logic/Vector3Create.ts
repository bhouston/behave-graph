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
        new Socket('number','x'),
        new Socket('number','y'),
        new Socket('number','z'),
      ],
      [
        new Socket('vector3','result'),
      ],
      (context: NodeEvalContext) => {
        context.writeOutput('result', new Vector3(context.readInput('x'), context.readInput('y'), context.readInput('z')));
      },
    );
  }
}
