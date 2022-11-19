import { Graph } from '../../../Graphs/Graph.js';
import { ImmediateNode } from '../../../Nodes/ImmediateNode.js';
import { NodeDescription } from '../../../Nodes/Registry/NodeDescription.js';
import { Socket } from '../../../Sockets/Socket.js';

export class VecElements<T> extends ImmediateNode {
  constructor(
    description: NodeDescription,
    graph: Graph,
    valueTypeName: string,
    elementNames: string[] = ['x', 'y', 'z', 'w'],
    toArray: (value: T, array: number[], offset: number) => void
  ) {
    super(
      description,
      graph,
      [new Socket(valueTypeName, 'value')],
      elementNames.map((elementName) => new Socket('float', elementName)),
      () => {
        const value = this.readInput('value') as T;
        const elementValues = elementNames.map(() => 0);
        toArray(value, elementValues, 0);
        elementNames.forEach((elementName, index) =>
          this.writeOutput(elementName, elementValues[index])
        );
      }
    );
  }
}
