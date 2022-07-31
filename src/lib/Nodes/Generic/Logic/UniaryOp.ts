import NumberSocket from '../../../Sockets/Typed/NumberSocket';
import Node from '../../Node';

import NodeEvalContext from '../../NodeEvalContext';

export default class UniaryOp<Input, Output> extends Node {
  constructor(nodeName: string, public uniaryEvalFunc: (a: Input) => Output) {
    super(
      nodeName,
      [
        new NumberSocket('a'),
      ],
      [new NumberSocket('result')],
      (context: NodeEvalContext) => {
        context.setOutputValue('result', this.uniaryEvalFunc(context.getInputValue('a')));
      },
    );
  }
}
