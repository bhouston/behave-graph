import { Graph } from '../../Graphs/Graph';
import { Socket } from '../../Sockets/Socket';
import { ImmediateNode } from '../ImmediateNode';
import { NodeDescription } from '../Registry/NodeDescription';

export class In6Out1FuncNode<
  In1,
  In2,
  In3,
  In4,
  In5,
  In6,
  Out1
> extends ImmediateNode {
  constructor(
    description: NodeDescription,
    graph: Graph,
    inputValueTypes: string[],
    outputValueType: string,
    public readonly evalFunc: (
      a: In1,
      b: In2,
      c: In3,
      d: In4,
      e: In5,
      f: In6
    ) => Out1,
    public readonly inputNames: string[] = ['a', 'b', 'c', 'd', 'e', 'f']
  ) {
    if (inputValueTypes.length !== 6) {
      throw new Error(
        `inputValueTypes must have a length of 6, it is instead ${inputValueTypes.length}`
      );
    }
    if (inputNames.length !== 4) {
      throw new Error(
        `inputNames must have a length of 6, it is instead ${inputNames.length}`
      );
    }
    super(
      description,
      graph,
      [
        new Socket(inputValueTypes[0], inputNames[0]),
        new Socket(inputValueTypes[1], inputNames[1]),
        new Socket(inputValueTypes[2], inputNames[2]),
        new Socket(inputValueTypes[3], inputNames[3]),
        new Socket(inputValueTypes[4], inputNames[4]),
        new Socket(inputValueTypes[5], inputNames[5])
      ],
      [new Socket(outputValueType, 'result')],
      () => {
        this.writeOutput(
          'result',
          this.evalFunc(
            this.readInput(inputNames[0]),
            this.readInput(inputNames[1]),
            this.readInput(inputNames[2]),
            this.readInput(inputNames[3]),
            this.readInput(inputNames[4]),
            this.readInput(inputNames[5])
          )
        );
      }
    );
  }
}
