import NumberSocket from './Sockets/Spec/NumberSocket';
import StringSocket from './Sockets/Spec/StringSocket';
import Node from '../../../Nodes/Node';

export class GetNodeScale extends Node {
  constructor() {
    super(
      'query',
      'getNodeScale',
      [new StringSocket('nodeIndex')],
      [new NumberSocket('xScale'), new NumberSocket('yScale'), new NumberSocket('zScale')],
      () => {
        const outputValues = new Map<string, any>();
        outputValues.set('xScale', 0);
        outputValues.set('yScale', 0);
        outputValues.set('zScale', 0);
        return outputValues;
      },
    );
  }
}
