import FlowSocket from '../../../Sockets/Typed/FlowSocket';
import NumberSocket from '../../../Sockets/Typed/NumberSocket';
import Node from '../../Node';

import NodeEvalContext from '../../NodeEvalContext';
import { NodeEvalStatus } from '../../NodeEvalStatus';

// ASYNC - asynchronous evaluation
// also called "delay"

export default class Delay extends Node {
  constructor() {
    super(
      'flow/delay',
      [
        new FlowSocket(),
        new NumberSocket('milliseconds'),
      ],
      [new FlowSocket()],
      (context: NodeEvalContext) => {
        console.log('starting delay');
        context.evalPromise = new Promise<NodeEvalStatus>((resolve, reject) => {
          setTimeout(() => {
            console.log('completing delay');
            resolve(NodeEvalStatus.Done);
          }, context.getInputValue('milliseconds '));
        });
      },
    );
  }
}
