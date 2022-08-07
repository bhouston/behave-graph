import createTypedSocket from '../../../Sockets/Typed/TypedSocketFactory';
import Node from '../../Node';
import NodeEvalContext from '../../NodeEvalContext';

export default class BinaryOp<Input, Output> extends Node {
  constructor(nodeName: string, inputValueType: string, outputValueType: string, public binaryEvalFunc: (a: Input, b: Input) => Output) {
    super(
      'Logic',
      nodeName,
      [
        createTypedSocket(inputValueType, 'a'),
        createTypedSocket(inputValueType, 'b'),
      ],
      [
        createTypedSocket(outputValueType, 'result'),
      ],
      (context: NodeEvalContext) => {
        context.setOutputValue('result', this.binaryEvalFunc(context.getInputValue('a'), context.getInputValue('b')));
      },
    );
  }
}
