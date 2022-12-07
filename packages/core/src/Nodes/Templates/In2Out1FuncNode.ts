import { Graph } from '../../Graphs/Graph';
import { Socket } from '../../Sockets/Socket';
import { ImmediateNode } from '../ImmediateNode';
import { NodeDescription } from '../Registry/NodeDescription';

export class In2Out1FuncNode<In1, In2, Out1> extends ImmediateNode {
  constructor(
    description: NodeDescription,
    graph: Graph,
    inputValueTypes: string[],
    outputValueType: string,
    public readonly evalFunc: (a: In1, b: In2) => Out1,
    public readonly inputNames: string[] = ['a', 'b']
  ) {
    if (inputValueTypes.length !== 2) {
      throw new Error(
        `inputValueTypes must have a length of 2, it is instead ${inputValueTypes.length}`
      );
    }
    if (inputNames.length !== 2) {
      throw new Error(
        `inputNames must have a length of 2, it is instead ${inputNames.length}`
      );
    }
    super(
      description,
      graph,
      [
        new Socket(inputValueTypes[0], inputNames[0]),
        new Socket(inputValueTypes[1], inputNames[1])
      ],
      [new Socket(outputValueType, 'result')],
      () => {
        this.write(
          'result',
          this.evalFunc(this.read(inputNames[0]), this.read(inputNames[1]))
        );
      }
    );
  }
}
