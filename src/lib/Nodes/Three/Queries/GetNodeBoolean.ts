import Node from '../../Node';

import BooleanSocket from '../../../Sockets/Typed/BooleanSocket';
import StringSocket from '../../../Sockets/Typed/StringSocket';
import NodeEvalContext from '../../NodeEvalContext';

export default class GetNodeBoolean extends Node {
  constructor(nodeName: string, public propertyName: string) {
    super(
      nodeName,
      [new StringSocket('nodeIndex')],
      [new BooleanSocket('result')],
      (context:NodeEvalContext) => {
        // TODO: actually get node visibility
        context.setOutputValue('result', true);
      },
    );
  }
}
