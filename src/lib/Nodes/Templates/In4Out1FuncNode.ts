import { Graph } from '../../Graphs/Graph.js';
import { Socket } from '../../Sockets/Socket.js';
import { Node } from '../Node.js';
import { NodeDescription } from '../NodeDescription.js';
import { NodeEvalContext } from '../NodeEvalContext.js';

export class In4Out1FuncNode<In1, In2, In3, In4, Out1> extends Node {
  constructor(
    description: NodeDescription,
    graph: Graph,
    input1ValueType: string,
    input2ValueType: string,
    input3ValueType: string,
    input4ValueType: string,
    outputValueType: string,
    public readonly binaryEvalFunc: (a: In1, b: In2, c: In3, d: In4) => Out1,
    public readonly inputNames: string[] = ['a', 'b', 'c', 'd']
  ) {
    if (inputNames.length !== 4) {
      throw new Error(
        `inputNames must have a length of 4, it is instead ${inputNames.length}`
      );
    }
    super(
      description,
      graph,
      [
        new Socket(input1ValueType, inputNames[0]),
        new Socket(input2ValueType, inputNames[1]),
        new Socket(input3ValueType, inputNames[2]),
        new Socket(input4ValueType, inputNames[3])
      ],
      [new Socket(outputValueType, 'result')],
      (context: NodeEvalContext) => {
        context.writeOutput(
          'result',
          this.binaryEvalFunc(
            context.readInput(inputNames[0]),
            context.readInput(inputNames[1]),
            context.readInput(inputNames[2]),
            context.readInput(inputNames[3])
          )
        );
      }
    );
  }
}
