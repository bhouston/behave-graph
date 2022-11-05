import { Graph } from '../../Graphs/Graph.js';
import { Socket } from '../../Sockets/Socket.js';
import { Node } from '../Node.js';
import { NodeDescription } from '../NodeDescription.js';
import { NodeEvalContext } from '../NodeEvalContext.js';

export class In2Out1FuncNode<In1, In2, Out1> extends Node {
  constructor(
    description: NodeDescription,
    graph: Graph,
    inputValueTypes: string[],
    outputValueType: string,
    public readonly binaryEvalFunc: (a: In1, b: In2) => Out1,
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
      (context: NodeEvalContext) => {
        context.writeOutput(
          'result',
          this.binaryEvalFunc(
            context.readInput(inputNames[0]),
            context.readInput(inputNames[1])
          )
        );
      }
    );
  }
}
