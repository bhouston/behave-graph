import { Graph } from '../../Graphs/Graph';
import { Socket } from '../../Sockets/Socket';
import { ImmediateNode } from '../ImmediateNode';
import { NodeDescription } from '../Registry/NodeDescription';

export class In0Out1FuncNode<Out1> extends ImmediateNode {
  constructor(
    description: NodeDescription,
    graph: Graph,
    outputValueType: string,
    public readonly evalFunc: () => Out1
  ) {
    super(
      description,
      graph,
      [],
      [new Socket(outputValueType, 'result')],
      () => {
        this.writeOutput('result', this.evalFunc());
      }
    );
  }
}
