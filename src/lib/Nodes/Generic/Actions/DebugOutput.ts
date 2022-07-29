import EvalSocket from '../../../Sockets/Typed/EvalSocket';
import StringSocket from '../../../Sockets/Typed/StringSocket';
import Node from '../../Node';
import NodeEvalContext from '../../NodeEvalContext';

export default class DebugOutput extends Node {
  constructor() {
    super(
      'action/debugOutput',
      [new EvalSocket(), new StringSocket('text')],
      [new EvalSocket()],
      (context: NodeEvalContext) => {
        console.log(`Debug Output: ${context.getInputValue('text')}`);
        context.setOutputValue('eval', true);
      },
    );
  }
}
