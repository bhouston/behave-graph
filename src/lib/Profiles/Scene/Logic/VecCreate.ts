import { Graph } from '../../../Graphs/Graph.js';
import { Node } from '../../../Nodes/Node.js';
import { NodeEvalContext } from '../../../Nodes/NodeEvalContext.js';
import { Socket } from '../../../Sockets/Socket.js';

export class VecCreate<T> extends Node {
  constructor(
    graph: Graph,
    typeName: string,
    valueTypeName: string,
    elementNames: string[] = ['x', 'y', 'z', 'w'],
    factory: (elements: number[]) => T
  ) {
    super(
      graph,
      typeName,
      'Logic',
      elementNames.map((elementName) => new Socket('float', elementName)),
      [new Socket(valueTypeName, 'result')],
      (context: NodeEvalContext) => {
        context.writeOutput(
          'result',
          factory(
            elementNames.map((elementName) => context.readInput(elementName))
          )
        );
      }
    );
  }
}
