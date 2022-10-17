import { Graph } from '../../Graphs/Graph.js';
import { Socket } from '../../Sockets/Socket.js';
import { Node } from '../Node.js';
import { NodeEvalContext } from '../NodeEvalContext.js';

export class In1Out1FuncNode<In1, Out1> extends Node {
  constructor(
    graph: Graph,
    nodeType: string,
    inputValueType: string,
    outputValueType: string,
    public readonly unaryEvalFunc: (a: In1) => Out1
  ) {
    super(
      graph,
      nodeType,
      'Logic',
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
