import Node from '../../../Nodes/Node';
import NodeEvalContext from '../../../Nodes/NodeEvalContext';
import BooleanSocket from '../../../Sockets/Typed/BooleanSocket';
import FlowSocket from '../../../Sockets/Typed/FlowSocket';

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
        context.commit(context.readInput('condition') ? 'true' : 'false');
      },
    );
  }
}
