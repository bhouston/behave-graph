import BooleanSocket from '../../../Sockets/Typed/BooleanSocket';
import FlowSocket from '../../../Sockets/Typed/FlowSocket';
import Node from '../../Node';

import NodeEvalContext from '../../NodeEvalContext';

export default class FlipFlop extends Node {
  private isA = true;

  constructor() {
    super(
      'flow/flipFlop',
      [
        new FlowSocket(),
      ],
      [
        new FlowSocket('a'),
        new FlowSocket('b'),
        new BooleanSocket('isA'),
      ],
      (context: NodeEvalContext) => {
        if (this.isA) {
          context.setOutputValue('a', true);
          context.setOutputValue('isA', true);
        } else {
          context.setOutputValue('b', true);
          context.setOutputValue('isA', false);
        }
        this.isA = !this.isA;
      },
    );
  }
}
