import FlowSocket from '../../../Sockets/Typed/FlowSocket';
import StringSocket from '../../../Sockets/Typed/StringSocket';
import Node from '../../Node';
import NodeEvalContext from '../../NodeEvalContext';

export default class Log extends Node {
  constructor() {
    super(
      'action/log',
      [new FlowSocket(), new StringSocket('text')],
      [new FlowSocket()],
      (context: NodeEvalContext) => {
        context.log(context.getInputValue('text'));
      },
    );
  }
}
