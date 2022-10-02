import Logger from '../../../Diagnostics/Logger';
import Node from '../../../Nodes/Node';
import NodeEvalContext from '../../../Nodes/NodeEvalContext';
import Socket from '../../../Sockets/Socket';

// https://docs.unrealengine.com/4.27/en-US/ProgrammingAndScripting/Blueprints/UserGuide/flow/

export default class Sequence extends Node {
  constructor() {
    super(
      'Flow',
      'flow/sequence',
      [new Socket('flow', 'flow')],
      [
        new Socket('flow', '1'),
        new Socket('flow', '2'),
        new Socket('flow', '3')
      ],
      (context: NodeEvalContext) => {
        // these outputs are fired sequentially in an async fashion but without delays.
        // Thus a promise is returned and it continually returns a promise until each of the sequences has been executed.
        const sequenceIteration = function sequenceIteration(i: number) {
          if (i < context.node.outputSockets.length) {
            const outputSocket = context.node.outputSockets[i];
            Logger.verbose(
              `sequence: processing output socket ${outputSocket.name}`
            );
            context.commit(outputSocket.name, () => {
              Logger.verbose('sequence: completed!');
              sequenceIteration(i + 1);
            });
          }
        };
        sequenceIteration(0);
      }
    );
  }
}
