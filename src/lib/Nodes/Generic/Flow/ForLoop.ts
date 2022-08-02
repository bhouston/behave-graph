import FlowSocket from '../../../Sockets/Typed/FlowSocket';
import NumberSocket from '../../../Sockets/Typed/NumberSocket';
import Node from '../../Node';
import NodeEvalContext from '../../NodeEvalContext';

export default class ForLoop extends Node {
  constructor() {
    super(
      'flow/forLoop',
      [
        new FlowSocket(),
        new NumberSocket('startIndex'),
        new NumberSocket('endIndex'),
      ],
      [
        new FlowSocket('loopBody'),
        new NumberSocket('index'),
        new FlowSocket('completed'),
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
