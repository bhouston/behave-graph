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
        new Socket('integer', 'startIndex'),
        new Socket('integer', 'endIndex')
      ],
      [
        new Socket('flow', 'loopBody'),
        new Socket('integer', 'index'),
        new Socket('flow', 'completed')
      ],
      (context: NodeEvalContext) => {
        // these outputs are fired sequentially in an async fashion but without delays.
        // Thus a promise is returned and it continually returns a promise until each of the sequences has been executed.
        const startIndex = context.readInput<bigint>('startIndex');
        const endIndex = context.readInput<bigint>('endIndex');
        const loopBodyIteration = function loopBodyIteration(i: bigint) {
          if (i < endIndex) {
            context.writeOutput('index', i);
            context.commit('loopBody', () => {
              loopBodyIteration(i + 1n);
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
