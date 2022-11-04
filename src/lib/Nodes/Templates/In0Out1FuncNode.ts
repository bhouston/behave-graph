import { Graph } from '../../Graphs/Graph.js';
import { Socket } from '../../Sockets/Socket.js';
import { ImmediateNode } from '../ImmediateNode.js';
import { NodeDescription } from '../Registry/NodeDescription.js';

export class In0Out1FuncNode<Out1> extends ImmediateNode {
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
      () => {
        this.writeOutput('result', this.nullaryEvalFunc());
      }
    );
  }
}
