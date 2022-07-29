import EvalSocket from '../../../Sockets/Typed/EvalSocket';
import NumberSocket from '../../../Sockets/Typed/NumberSocket';
import Node from '../../Node';

import NodeEvalContext from '../../NodeEvalContext';

// ASYNC - asynchronous evaluation
// also called "delay"

export default class Delay extends Node {
  constructor() {
    super(
      'flowcontrol/delay',
      [
        new EvalSocket(),
        new NumberSocket('milliseconds'),
      ],
      [new EvalSocket()],
      (context: NodeEvalContext) => new Promise<NodeEvalContext>((resolve, reject) => {
        setTimeout(() => {
          resolve(context);
        }, context.getInputValue('milliseconds '));
      }),
    );
  }
}
