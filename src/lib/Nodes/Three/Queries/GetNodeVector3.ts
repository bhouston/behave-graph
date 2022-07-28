import NumberSocket from '../../../Sockets/Typed/NumberSocket';
import StringSocket from '../../../Sockets/Typed/StringSocket';
import Node from '../../Node';

export default class GetNodeVector3 extends Node {
  constructor(nodeName: string, public propertyName: string) {
    super(
      nodeName,
      [new StringSocket('nodeIndex')],
      [new NumberSocket('x'), new NumberSocket('y'), new NumberSocket('z')],
      () => {
        const outputValues = new Map<string, any>();
        // TODO: Actually read property of the node
        outputValues.set('x', 0);
        outputValues.set('y', 0);
        outputValues.set('z', 0);
        return outputValues;
      },
    );
  }
}
