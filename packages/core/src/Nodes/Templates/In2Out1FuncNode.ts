import { Graph } from '../../Graphs/Graph';
import { Socket } from '../../Sockets/Socket';
import { FunctionNode } from '../FunctionNode';
import { NodeDescription } from '../Registry/NodeDescription';
import { inputSocketName, resultNodeName } from './keys';

export class In2Out1FuncNode<In1, In2, Out1> extends FunctionNode {
  constructor(
    description: NodeDescription,
    graph: Graph,
    inputValueTypes: string[],
    outputValueType: string,
    public readonly evalFunc: (a: In1, b: In2) => Out1,
    public readonly inputNames: string[] = [
      inputSocketName.a,
      inputSocketName.b
    ]
  ) {
    if (inputValueTypes.length !== 2) {
      throw new Error(
        `inputValueTypes of ${description.typeName}  must have a length of 2, it is instead ${inputValueTypes.length}`
      );
    }
    if (inputNames.length !== 2) {
      throw new Error(
        `inputNames of ${description.typeName}  must have a length of 2, it is instead ${inputNames.length}`
      );
    }
    super(
      description,
      graph,
      [
        new Socket(inputValueTypes[0], inputNames[0]),
        new Socket(inputValueTypes[1], inputNames[1])
      ],
      [new Socket(outputValueType, resultNodeName)],
      () => {
        this.writeOutput(
          resultNodeName,
          this.evalFunc(
            this.readInput(inputNames[0]),
            this.readInput(inputNames[1])
          )
        );
      }
    );
  }
}
