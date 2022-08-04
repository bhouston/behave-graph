import NumberSocket from '../../../Sockets/Typed/NumberSocket';
import Node from '../../Node';
import { NodeCategory } from '../../NodeCategory';
import NodeEvalContext from '../../NodeEvalContext';

export default class UnaryOp<Input, Output> extends Node {
  constructor(nodeName: string, public unaryEvalFunc: (a: Input) => Output) {
    super(
      NodeCategory.Logic,
      nodeName,
      [
        new NumberSocket('a'),
      ],
      [new NumberSocket('result')],
      (context: NodeEvalContext) => {
        context.setOutputValue('result', this.unaryEvalFunc(context.getInputValue('a')));
      },
    );
  }
}
