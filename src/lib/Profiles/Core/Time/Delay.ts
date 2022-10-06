import { Logger } from '../../../Diagnostics/Logger';
import { Node } from '../../../Nodes/Node';
import { NodeEvalContext } from '../../../Nodes/NodeEvalContext';
import { Socket } from '../../../Sockets/Socket';

// ASYNC - asynchronous evaluation
// also called "delay"

export class Delay extends Node {
  constructor() {
    super(
      'Time',
      'time/delay',
      [new Socket('flow', 'flow'), new Socket('float', 'duration')],
      [new Socket('flow', 'flow')],
      (context: NodeEvalContext) => {
        let timeIsCancelled = false; // work around clearTimeout is not available on node.

        setTimeout(() => {
          if (timeIsCancelled) {
            return;
          }
          Logger.verbose('setTimeout on Delay fired, context.commit("flow")');
          context.commit('flow');
          context.finish();
        }, context.readInput<number>('duration') * 1000);

        context.onAsyncCancelled.addListener(() => {
          timeIsCancelled = true;
        });
      }
    );

    this.async = true;
  }
}
