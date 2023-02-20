import {
  FunctionNode,
  IGraphApi,
  NodeDescription,
  Socket
} from '@behave-graph/core';

export class VecElements<T> extends FunctionNode {
  constructor(
    description: NodeDescription,
    graph: IGraphApi,
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
