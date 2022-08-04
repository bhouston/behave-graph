import NumberSocket from '../../../Sockets/Typed/NumberSocket';
import Node from '../../Node';
import { NodeCategory } from '../../NodeCategory';
import NodeEvalContext from '../../NodeEvalContext';

export default class NullaryOp<Output> extends Node {
  constructor(nodeName: string, public nullaryEvalFunc: () => Output) {
    super(
      NodeCategory.Logic,
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
