import NumberSocket from './Sockets/Spec/NumberSocket';
import StringSocket from './Sockets/Spec/StringSocket';
import Node from '../../../Nodes/Node';

import BooleanSocket from '../../Sockets/Typed/BooleanSocket';

export default class GetNodeBoolean extends Node {
  constructor(nodeName: string, public propertyName: string) {
    super(
      nodeName,
      [new StringSocket('nodeIndex')],
      [new BooleanSocket('result')],
      () => {
        const outputValues = new Map<string, any>();
        // TODO: actually get node visibility
        outputValues.set('result', true);
        return outputValues;
      },
    );
  }
}
