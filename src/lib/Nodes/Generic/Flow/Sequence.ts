import FlowSocket from '../../../Sockets/Typed/FlowSocket';
import Node from '../../Node';
import NodeEvalContext from '../../NodeEvalContext';

// https://docs.unrealengine.com/4.27/en-US/ProgrammingAndScripting/Blueprints/UserGuide/flow/

export default class Sequence extends Node {
  constructor() {
    super(
      'Flow',
      'flow/sequence',
      [new FlowSocket()],
      [
        new FlowSocket('1'),
        new FlowSocket('2'),
        new FlowSocket('3'),
      ],
      (context: NodeEvalContext) => {
        // these outputs are fired sequentially in an async fashion but without delays.
        // Thus a promise is returned and it continually returns a promise until each of the sequences has been executed.
        context.setOutputValue('1', true);
        // context.setOutputValue('2', false);
        // context.setOutputValue('3', false);
      },
    );
  }
}
