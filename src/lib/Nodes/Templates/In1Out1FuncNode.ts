import { Socket } from '../../Sockets/Socket';
import { Node } from '../Node';
import { NodeEvalContext } from '../NodeEvalContext';

export class In1Out1FuncNode<In1, Out1> extends Node {
  constructor(
    nodeName: string,
    inputValueType: string,
    outputValueType: string,
    public readonly unaryEvalFunc: (a: In1) => Out1
  ) {
    super(
      'Logic',
      nodeName,
      [new Socket(inputValueType, 'a')],
      [new Socket(outputValueType, 'result')],
      (context: NodeEvalContext) => {
        context.writeOutput(
          'result',
          this.unaryEvalFunc(context.readInput('a'))
        );
      }
    );
  }
}
