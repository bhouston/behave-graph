import createTypedSocket from '../../../Sockets/Typed/TypedSocketFactory';
import Node from '../../Node';
import NodeEvalContext from '../../NodeEvalContext';

export default class QuaternaryOp<Input1, Input2, Input3, Input4, Output> extends Node {
  constructor(
    nodeName: string,
    input1ValueType: string,
    input2ValueType: string,
    input3ValueType: string,
    input4ValueType: string,
    outputValueType: string,
    public binaryEvalFunc: (a: Input1, b: Input2, c: Input3, d: Input4) => Output,
  ) {
    super(
      'Logic',
      nodeName,
      [
        createTypedSocket(input1ValueType, 'a'),
        createTypedSocket(input2ValueType, 'b'),
        createTypedSocket(input3ValueType, 'c'),
        createTypedSocket(input4ValueType, 'd'),
      ],
      [
        createTypedSocket(outputValueType, 'result'),
      ],
      (context: NodeEvalContext) => {
        context.writeOutput('result', this.binaryEvalFunc(context.readInput('a'), context.readInput('b'), context.readInput('c'), context.readInput('d')));
      },
    );
  }
}
