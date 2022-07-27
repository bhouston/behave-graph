import Node from '../Node';

import BooleanSocket from '../../Sockets/Typed/BooleanSocket';
import StringSocket from '../../Sockets/Typed/StringSocket';

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
