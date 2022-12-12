import { Graph } from '../../Graphs/Graph';
import { Socket } from '../../Sockets/Socket';
import { FunctionNode } from '../FunctionNode';
import { NodeDescription } from '../Registry/NodeDescription';

export class In0Out1FuncNode<Out1> extends FunctionNode {
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
