import { Graph } from '../../../Graphs/Graph';
import { ImmediateNode } from '../../../Nodes/ImmediateNode';
import { NodeDescription } from '../../../Nodes/Registry/NodeDescription';
import { Socket } from '../../../Sockets/Socket';

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
        const value = this.read('value') as T;
        const elementValues = elementNames.map(() => 0);
        toArray(value, elementValues, 0);
        elementNames.forEach((elementName, index) =>
          this.write(elementName, elementValues[index])
        );
      }
    );
  }
}
