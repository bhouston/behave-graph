import createTypedSocket from '../../../Sockets/Typed/TypedSocketFactory';
import Node from '../../Node';
import NodeEvalContext from '../../NodeEvalContext';

export default class BinaryOp<Input1, Input2, Output> extends Node {
  constructor(
    nodeName: string,
    input1ValueType: string,
    input2ValueType: string,
    outputValueType: string,
    public binaryEvalFunc: (a: Input1, b: Input2) => Output,
  ) {
    super(
      'Logic',
      nodeName,
      [
        createTypedSocket(input1ValueType, 'a'),
        createTypedSocket(input2ValueType, 'b'),
      ],
      [
        createTypedSocket(outputValueType, 'result'),
      ],
      (context: NodeEvalContext) => {
        context.writeOutput('result', this.binaryEvalFunc(context.readInput('a'), context.readInput('b')));
      },
    );
  }
}
