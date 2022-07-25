import NumberSocket from './Sockets/Spec/NumberSocket';
import StringSocket from './Sockets/Spec/StringSocket';
import Node from '../../../Nodes/Node';

export class GetNodeTranslation extends Node {
  constructor() {
    super(
      'query',
      'getNodeTranslation',
      [new StringSocket('nodeIndex')],
      [new NumberSocket('xTranslation'), new NumberSocket('yTranslation'), new NumberSocket('zTranslation')],
      () => {
        const outputValues = new Map<string, any>();
        outputValues.set('xTranslation', 0);
        outputValues.set('yTranslation', 0);
        outputValues.set('zTranslation', 0);
        return outputValues;
      },
    );
  }
}
