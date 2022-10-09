import { Socket } from '../../Sockets/Socket';
import { Node } from '../Node';
import { NodeEvalContext } from '../NodeEvalContext';

export class In4Out1FuncNode<In1, In2, In3, In4, Out1> extends Node {
  constructor(
    nodeName: string,
    input1ValueType: string,
    input2ValueType: string,
    input3ValueType: string,
    input4ValueType: string,
    outputValueType: string,
    public readonly binaryEvalFunc: (a: In1, b: In2, c: In3, d: In4) => Out1
  ) {
    super(
      'Logic',
      nodeName,
      [
        new Socket(input1ValueType, 'a'),
        new Socket(input2ValueType, 'b'),
        new Socket(input3ValueType, 'c'),
        new Socket(input4ValueType, 'd')
      ],
      [new Socket(outputValueType, 'result')],
      (context: NodeEvalContext) => {
        context.writeOutput(
          'result',
          this.binaryEvalFunc(
            context.readInput('a'),
            context.readInput('b'),
            context.readInput('c'),
            context.readInput('d')
          )
        );
      }
    );
  }
}
