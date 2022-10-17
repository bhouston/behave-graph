import { Graph } from '../../Graphs/Graph.js';
import { Socket } from '../../Sockets/Socket.js';
import { Node } from '../Node.js';
import { NodeDescription } from '../NodeDescription.js';
import { NodeEvalContext } from '../NodeEvalContext.js';

export class In2Out1FuncNode<In1, In2, Out1> extends Node {
  constructor(
    description: NodeDescription,
    graph: Graph,
    input1ValueType: string,
    input2ValueType: string,
    outputValueType: string,
    public readonly binaryEvalFunc: (a: In1, b: In2) => Out1
  ) {
    super(
      description,
      graph,
      [new Socket(input1ValueType, 'a'), new Socket(input2ValueType, 'b')],
      [new Socket(outputValueType, 'result')],
      (context: NodeEvalContext) => {
        context.writeOutput(
          'result',
          this.binaryEvalFunc(context.readInput('a'), context.readInput('b'))
        );
      }
    );
  }
}
