import Socket from '../../Sockets/Socket';
import Node from '../Node';
import NodeEvalContext from '../NodeEvalContext';

export default class In2Out1FuncNode<In1, In2, Out1> extends Node {
  constructor(
    nodeName: string,
    input1ValueType: string,
    input2ValueType: string,
    outputValueType: string,
    public binaryEvalFunc: (a: In1, b: In2) => Out1
  ) {
    super(
      'Logic',
      nodeName,
      [new Socket(input1ValueType, 'a'), new Socket(input2ValueType, 'b')],
      [new Socket(outputValueType, 'result')],
      (context: NodeEvalContext) => {
        context.writeOutput(
          'result',
          this.binaryEvalFunc(context.readInput('a'), context.readInput('b'))
        );
      }
    );
  }
}
