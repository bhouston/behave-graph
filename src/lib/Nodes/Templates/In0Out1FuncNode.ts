import { Socket } from '../../Sockets/Socket.js';
import { Node } from '../Node.js';
import { NodeEvalContext } from '../NodeEvalContext.js';

export class In0Out1FuncNode<Out1> extends Node {
  constructor(
    graph: Graph,
    nodeType: string,
    outputValueType: string,
    public readonly nullaryEvalFunc: () => Out1
  ) {
    super(
      graph,
      nodeType,
      'Logic',
      [],
      [new Socket(outputValueType, 'result')],
      (context: NodeEvalContext) => {
        context.writeOutput('result', this.nullaryEvalFunc());
      }
    );
  }
}
