import { Socket } from '../../Sockets/Socket';
import { Node } from '../Node';
import { NodeEvalContext } from '../NodeEvalContext';

export class In0Out1FuncNode<Out1> extends Node {
  constructor(
    nodeName: string,
    outputValueType: string,
    public readonly nullaryEvalFunc: () => Out1
  ) {
    super(
      'Logic',
      nodeName,
      [],
      [new Socket(outputValueType, 'result')],
      (context: NodeEvalContext) => {
        context.writeOutput('result', this.nullaryEvalFunc());
      }
    );
  }
}
