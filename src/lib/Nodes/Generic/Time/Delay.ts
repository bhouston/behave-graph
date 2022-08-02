import FlowSocket from '../../../Sockets/Typed/FlowSocket';
import NumberSocket from '../../../Sockets/Typed/NumberSocket';
import Node from '../../Node';
import NodeEvalContext from '../../NodeEvalContext';

// ASYNC - asynchronous evaluation
// also called "delay"

export default class Delay extends Node {
  constructor() {
    super(
      'time/delay',
      [
        new FlowSocket(),
        new NumberSocket('duration'),
      ],
      [new FlowSocket()],
      (context: NodeEvalContext) => {
        context.evalPromise = new Promise<true>(() => {});
        setTimeout(() => {
          context.commit('flow');
        }, context.getInputValue('duration') * 1000);
      },
    );
  }
}
