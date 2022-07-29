import NumberSocket from '../../../Sockets/Typed/NumberSocket';
import StringSocket from '../../../Sockets/Typed/StringSocket';
import Node from '../../Node';
import NodeEvalContext from '../../NodeEvalContext';

export default class GetNodeVector3 extends Node {
  constructor(nodeName: string, public propertyName: string) {
    super(
      nodeName,
      [new StringSocket('nodeIndex')],
      [new NumberSocket('x'), new NumberSocket('y'), new NumberSocket('z')],
      (context:NodeEvalContext) => {
        // TODO: Actually read property of the node
        context.setOutputValue('x', 0);
        context.setOutputValue('y', 0);
        context.setOutputValue('z', 0);
      },
    );
  }
}
