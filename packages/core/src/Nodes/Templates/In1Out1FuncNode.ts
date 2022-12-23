import { Graph } from '../../Graphs/Graph';
import { Socket } from '../../Sockets/Socket';
import { FunctionNode } from '../FunctionNode';
import { NodeDescription } from '../Registry/NodeDescription';
import { inputSocketName, resultNodeName } from './keys';

export class In1Out1FuncNode<In1, Out1> extends FunctionNode {
  constructor(
    description: NodeDescription,
    graph: Graph,
    inputValueTypes: string[],
    outputValueType: string,
    public readonly evalFunc: (a: In1) => Out1,
    public readonly inputNames: string[] = [inputSocketName.a]
  ) {
    if (inputValueTypes.length !== 1) {
      throw new Error(
        `inputValueTypes of ${description.typeName}  must have a length of 1, it is instead ${inputValueTypes.length}`
      );
    }
    if (inputNames.length !== 1) {
      throw new Error(
        `inputNames of ${description.typeName}  must have a length of 1, it is instead ${inputNames.length}`
      );
    }
    super(
      description,
      graph,
      [new Socket(inputValueTypes[0], inputNames[0])],
      [new Socket(outputValueType, resultNodeName)],
      () => {
        this.writeOutput(
          resultNodeName,
          this.evalFunc(this.readInput(inputNames[0]))
        );
      }
    );
  }
}
