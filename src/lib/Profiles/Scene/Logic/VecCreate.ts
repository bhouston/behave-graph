import { Graph } from '../../../Graphs/Graph.js';
import { Node } from '../../../Nodes/Node.js';
import { NodeDescription } from '../../../Nodes/NodeDescription.js';
import { NodeEvalContext } from '../../../Nodes/NodeEvalContext.js';
import { Socket } from '../../../Sockets/Socket.js';

export class VecCreate<T> extends Node {
  constructor(
    description: NodeDescription,
    graph: Graph,
    valueTypeName: string,
    elementNames: string[] = ['x', 'y', 'z', 'w'],
    factory: (elements: number[]) => T
  ) {
    super(
      description,
      graph,
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
