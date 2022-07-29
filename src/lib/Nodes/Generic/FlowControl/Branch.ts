import BooleanSocket from '../../../Sockets/Typed/BooleanSocket';
import EvalSocket from '../../../Sockets/Typed/EvalSocket';
import Node from '../../Node';

import NodeEvalContext from '../../NodeEvalContext';

export default class Branch extends Node {
  constructor() {
    super(
      'flowcontrol/branch',
      [
        new EvalSocket(),
        new BooleanSocket('condition'),
      ],
      [
        new EvalSocket('true'),
        new EvalSocket('false'),
      ],
      (context: NodeEvalContext) => {
        context.setOutputValue(context.getInputValue('condition') ? 'true' : 'false', true);
      },
    );
  }
}
