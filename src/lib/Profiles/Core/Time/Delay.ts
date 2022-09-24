import { clearTimeout } from 'timers';

import Logger from '../../../Diagnostics/Logger';
import Node from '../../../Nodes/Node';
import NodeEvalContext from '../../../Nodes/NodeEvalContext';

// ASYNC - asynchronous evaluation
// also called "delay"

export default class Delay extends Node {
  constructor() {
    super(
      'Time',
      'time/delay',
      [
        new Socket('flow'),
        new Socket('number', 'duration'),
      ],
      [new Socket('flow')],
      (context: NodeEvalContext) => {
        const timer = setTimeout(() => {
          Logger.verbose('setTimeout on Delay fired, context.commit("flow")');
          context.commit('flow');
          context.finish();
        }, context.readInput('duration') * 1000);

        context.onAsyncCancelled.addListener(() => {
          clearTimeout(timer);
        });
      },
    );

    this.async = true;
  }
}
