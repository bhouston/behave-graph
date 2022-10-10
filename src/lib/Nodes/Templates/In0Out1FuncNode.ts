import { Socket } from '../../Sockets/Socket.js';
import { Node } from '../Node.js';
import { NodeEvalContext } from '../NodeEvalContext.js';

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
