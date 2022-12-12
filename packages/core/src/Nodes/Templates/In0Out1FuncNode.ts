import { Graph } from '../../Graphs/Graph';
import { Socket } from '../../Sockets/Socket';
import { ImmediateNode } from '../ImmediateNode';
import { NodeDescription } from '../Registry/NodeDescription';
import { resultNodeName } from './keys';

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
      [new Socket(outputValueType, resultNodeName)],
      () => {
        this.writeOutput(resultNodeName, this.evalFunc());
      }
    );
  }
}
