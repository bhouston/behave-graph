import createTypedSocket from '../../Sockets/Typed/TypedSocketFactory';
import Node from '../Node';
import NodeEvalContext from '../NodeEvalContext';

export default class In3Out1FuncNode<In1, In2, In3, Out1> extends Node {
  constructor(
    nodeName: string,
    input1ValueType: string,
    input2ValueType: string,
    input3ValueType: string,
    outputValueType: string,
    public binaryEvalFunc: (a: In1, b: In2, c: In3) => Out1,
  ) {
    super(
      'Logic',
      nodeName,
      [
        createTypedSocket(input1ValueType, 'a'),
        createTypedSocket(input2ValueType, 'b'),
        createTypedSocket(input3ValueType, 'c'),
      ],
      [
        createTypedSocket(outputValueType, 'result'),
      ],
      (context: NodeEvalContext) => {
        context.writeOutput('result', this.binaryEvalFunc(context.readInput('a'), context.readInput('b'), context.readInput('c')));
      },
    );
  }
}
