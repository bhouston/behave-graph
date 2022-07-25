import NumberSocket from './Sockets/Spec/NumberSocket';
import StringSocket from './Sockets/Spec/StringSocket';
import Node from '../../../Nodes/Node';

export class GetNodeRotation extends Node {
  constructor() {
    super(
      'query',
      'getNodeRotation',
      [new StringSocket('nodeIndex')],
      [new NumberSocket('xRotation'), new NumberSocket('yRotation'), new NumberSocket('zRotation')],
      (context, inputValues) => {
        const outputValues = new Map<string, any>();
        outputValues.set('xRotation', 0);
        outputValues.set('yRotation', 0);
        outputValues.set('zRotation', 0);
        return outputValues;
      },
    );
  }
}
