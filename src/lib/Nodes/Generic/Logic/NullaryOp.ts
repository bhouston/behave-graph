import NumberSocket from '../../../Sockets/Typed/NumberSocket';
import Node from '../../Node';
import NodeEvalContext from '../../NodeEvalContext';

export default class NullaryOp<Output> extends Node {
  constructor(nodeName: string, public nullaryEvalFunc: () => Output) {
    super(
      nodeName,
      [
        new NumberSocket('a'),
        new NumberSocket('b'),
      ],
      [new NumberSocket('result')],
      (context: NodeEvalContext) => {
        context.setOutputValue('result', this.nullaryEvalFunc());
      },
    );
  }
}
