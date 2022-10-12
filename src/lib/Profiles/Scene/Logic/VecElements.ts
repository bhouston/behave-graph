import { Node } from '../../../Nodes/Node.js';
import { NodeEvalContext } from '../../../Nodes/NodeEvalContext.js';
import { Socket } from '../../../Sockets/Socket.js';

export class VecElements<T> extends Node {
  constructor(
    nodeTypeName: string,
    valueTypeName: string,
    elementNames: string[] = ['x', 'y', 'z', 'w'],
    toArray: (value: T, array: number[], offset: number) => void
  ) {
    super(
      'Logic',
      nodeTypeName,
      [new Socket(valueTypeName, 'value')],
      elementNames.map((elementName) => new Socket('float', elementName)),
      (context: NodeEvalContext) => {
        const value = context.readInput('value') as T;
        const elementValues = elementNames.map(() => 0);
        toArray(value, elementValues, 0);
        elementNames.forEach((elementName, index) =>
          context.writeOutput(elementName, elementValues[index])
        );
      }
    );
  }
}
