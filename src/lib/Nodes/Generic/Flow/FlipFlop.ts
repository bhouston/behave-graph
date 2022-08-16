import BooleanSocket from '../../../Sockets/Typed/BooleanSocket';
import FlowSocket from '../../../Sockets/Typed/FlowSocket';
import Node from '../../Node';
import NodeEvalContext from '../../NodeEvalContext';

export default class FlipFlop extends Node {
  private isA = true;

  constructor() {
    super(
      'Flow',
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
        context.setOutputValue('isA', this.isA);
        context.commit(this.isA ? 'a' : 'b');
        this.isA = !this.isA;
      },
    );
  }
}
