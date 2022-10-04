import { Logger } from '../../../Diagnostics/Logger';
import { Node } from '../../../Nodes/Node';
import { NodeEvalContext } from '../../../Nodes/NodeEvalContext';
import { Socket } from '../../../Sockets/Socket';

export class ForLoop extends Node {
  constructor() {
    super(
      'Flow',
      'flow/forLoop',
      [
        new Socket('flow', 'flow'),
        new Socket('number', 'startIndex'),
        new Socket('number', 'endIndex')
      ],
      [
        new Socket('flow', 'loopBody'),
        new Socket('number', 'index'),
        new Socket('flow', 'completed')
      ],
      (context: NodeEvalContext) => {
        // these outputs are fired sequentially in an async fashion but without delays.
        // Thus a promise is returned and it continually returns a promise until each of the sequences has been executed.
        const startIndex = context.readInput<number>('startIndex');
        const endIndex = context.readInput<number>('endIndex');
        const loopBodyIteration = function loopBodyIteration(i: number) {
          Logger.verbose(`loop: loop body ${i} of [${startIndex}:${endIndex})`);
          if (i < endIndex) {
            context.writeOutput('index', i);
            context.commit('loopBody', () => {
              Logger.verbose(`loop: body completed for ${i}!`);
              loopBodyIteration(i + 1);
            });
          } else {
            context.commit('completed');
          }
        };
        loopBodyIteration(startIndex);
      }
    );
  }
}
