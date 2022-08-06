import FlowSocket from '../../../Sockets/Typed/FlowSocket';
import NumberSocket from '../../../Sockets/Typed/NumberSocket';
import Node from '../../Node';
import NodeEvalContext from '../../NodeEvalContext';

// ASYNC - asynchronous evaluation
// also called "delay"

export default class Delay extends Node {
  constructor() {
    super(
      'Time',
      'time/delay',
      [
        new FlowSocket(),
        new NumberSocket('duration'),
      ],
      [new FlowSocket()],
      (context: NodeEvalContext) => {
        context.beginAsync();
        setTimeout(() => {
          context.commit('flow');
          context.endAsync();
        }, context.getInputValue('duration') * 1000);
      },
    );
  }
}
