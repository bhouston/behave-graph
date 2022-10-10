import { Socket } from '../../Sockets/Socket.js';
import { Node } from '../Node.js';
import { NodeEvalContext } from '../NodeEvalContext.js';

export class In3Out1FuncNode<In1, In2, In3, Out1> extends Node {
  constructor(
    nodeName: string,
    input1ValueType: string,
    input2ValueType: string,
    input3ValueType: string,
    outputValueType: string,
    public readonly binaryEvalFunc: (a: In1, b: In2, c: In3) => Out1
  ) {
    super(
      'Logic',
      nodeName,
      [
        new Socket(input1ValueType, 'a'),
        new Socket(input2ValueType, 'b'),
        new Socket(input3ValueType, 'c')
      ],
      [new Socket(outputValueType, 'result')],
      (context: NodeEvalContext) => {
        context.writeOutput(
          'result',
          this.binaryEvalFunc(
            context.readInput('a'),
            context.readInput('b'),
            context.readInput('c')
          )
        );
      }
    );
  }
}
