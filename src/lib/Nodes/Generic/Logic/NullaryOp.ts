import createTypedSocket from '../../../Sockets/Typed/TypedSocketFactory';
import Node from '../../Node';
import { NodeCategory } from '../../NodeCategory';
import NodeEvalContext from '../../NodeEvalContext';

export default class NullaryOp<Output> extends Node {
  constructor(nodeName: string, outputValueType: string, public nullaryEvalFunc: () => Output) {
    super(
      NodeCategory.Logic,
      nodeName,
      [],
      [createTypedSocket(outputValueType, 'result')],
      (context: NodeEvalContext) => {
        context.setOutputValue('result', this.nullaryEvalFunc());
      },
    );
  }
}
