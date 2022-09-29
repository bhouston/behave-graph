import Logger from '../../../Diagnostics/Logger';
import Node from '../../../Nodes/Node';
import NodeEvalContext from '../../../Nodes/NodeEvalContext';
import Socket from '../../../Sockets/Socket';

// ASYNC - asynchronous evaluation
// also called "delay"

export default class Delay extends Node {
  constructor() {
    super(
      'Time',
      'time/delay',
      [
        new Socket('flow', 'flow'),
        new Socket('number', 'duration'),
      ],
      [
        new Socket('flow', 'flow'),
      ],
      (context: NodeEvalContext) => {
        const cancelled = false;

        setTimeout(() => {
          if (cancelled) return;
          Logger.verbose('setTimeout on Delay fired, context.commit("flow")');
          context.commit('flow');
          context.finish();
        }, context.readInput('duration') * 1000);

        context.onAsyncCancelled.addListener(() => {
          cancelled = true;
        });
      },
    );

    this.async = true;
  }
}
