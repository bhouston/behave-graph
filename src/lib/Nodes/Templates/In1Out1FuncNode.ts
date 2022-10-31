import { Graph } from '../../Graphs/Graph.js';
import { Socket } from '../../Sockets/Socket.js';
import { Node } from '../Node.js';
import { NodeDescription } from '../NodeDescription.js';
import { NodeEvalContext } from '../NodeEvalContext.js';

export class In1Out1FuncNode<In1, Out1> extends Node {
  constructor(
    description: NodeDescription,
    graph: Graph,
    inputValueTypes: string[],
    outputValueType: string,
    public readonly unaryEvalFunc: (a: In1) => Out1,
    public readonly inputNames: string[] = ['a']
  ) {
    if (inputValueTypes.length !== 1) {
      throw new Error(
        `inputValueTypes must have a length of 1, it is instead ${inputValueTypes.length}`
      );
    }
    if (inputNames.length !== 1) {
      throw new Error(
        `inputNames must have a length of 1, it is instead ${inputNames.length}`
      );
    }
    super(
      description,
      graph,
      [new Socket(inputValueTypes[0], inputNames[0])],
      [new Socket(outputValueType, 'result')],
      (context: NodeEvalContext) => {
        context.writeOutput(
          'result',
          this.unaryEvalFunc(context.readInput(inputNames[0]))
        );
      }
    );
  }
}
