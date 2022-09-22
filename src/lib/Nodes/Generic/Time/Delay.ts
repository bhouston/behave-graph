import { clearTimeout } from 'timers';

import Logger from '../../../Diagnostics/Logger';
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
        const timer = setTimeout(() => {
          Logger.verbose('setTimeout on Delay fired, context.commit("flow")');
          context.asyncCommit('flow');
          context.endAsync();
        }, context.getInputValue('duration') * 1000);

        context.beginAsync();
        context.onAsyncCancelled.addListener(() => {
          clearTimeout(timer);
        });
      },
    );
  }
}
