import { Graph } from '../../Graphs/Graph.js';
import { Socket } from '../../Sockets/Socket.js';
import { Node } from '../Node.js';
import { NodeDescription } from '../NodeDescription.js';
import { NodeEvalContext } from '../NodeEvalContext.js';

export class In0Out1FuncNode<Out1> extends Node {
  constructor(
    description: NodeDescription,
    graph: Graph,
    outputValueType: string,
    public readonly nullaryEvalFunc: () => Out1
  ) {
    super(
      description,
      graph,
      [],
      [new Socket(outputValueType, 'result')],
      (context: NodeEvalContext) => {
        this.writeOutput('result', this.nullaryEvalFunc());
      }
    );
  }
}
