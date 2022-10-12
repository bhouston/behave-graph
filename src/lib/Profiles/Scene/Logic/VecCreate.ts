import { Node } from '../../../Nodes/Node.js';
import { NodeEvalContext } from '../../../Nodes/NodeEvalContext.js';
import { Socket } from '../../../Sockets/Socket.js';

export class VecCreate<T> extends Node {
  constructor(
    nodeTypeName: string,
    valueTypeName: string,
    elementNames: string[] = ['x', 'y', 'z', 'w'],
    factory: (elements: number[]) => T
  ) {
    super(
      'Logic',
      nodeTypeName,
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
