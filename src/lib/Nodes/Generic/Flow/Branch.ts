import BooleanSocket from '../../../Sockets/Typed/BooleanSocket';
import FlowSocket from '../../../Sockets/Typed/FlowSocket';
import Node from '../../Node';
import NodeEvalContext from '../../NodeEvalContext';

export default class Branch extends Node {
  constructor() {
    super(
      'Flow',
      'flow/branch',
      [
        new FlowSocket(),
        new BooleanSocket('condition'),
      ],
      [
        new FlowSocket('true'),
        new FlowSocket('false'),
      ],
      (context: NodeEvalContext) => {
        context.commit(context.getInputValue('condition') ? 'true' : 'false');
      },
    );
  }
}
