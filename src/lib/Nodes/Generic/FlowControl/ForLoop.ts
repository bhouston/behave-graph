import EvalSocket from '../../../Sockets/Typed/EvalSocket';
import NumberSocket from '../../../Sockets/Typed/NumberSocket';
import Node from '../../Node';

import NodeEvalContext from '../../NodeEvalContext';

export default class ForLoop extends Node {
  constructor() {
    super(
      'flowcontrol/forloop',
      [
        new EvalSocket(),
        new NumberSocket('startIndex'),
        new NumberSocket('endIndex'),
      ],
      [
        new EvalSocket('loopBody'),
        new NumberSocket('index'),
        new EvalSocket('completed'),
      ],
      (context: NodeEvalContext) => {
        // TODO: Figure out how to have multiple multiple "loop" evals each with an index
        // and then, once done, eval "complete"
        context.setOutputValue('loopBody', true);
        context.setOutputValue('index', context.getInputValue('startIndex'));
      },
    );
  }
}
