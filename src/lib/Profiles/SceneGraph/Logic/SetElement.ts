import { Node } from '../../../Nodes/Node';
import { NodeEvalContext } from '../../../Nodes/NodeEvalContext';
import { Socket } from '../../../Sockets/Socket';

export class SetElement<Component, Element> extends Node {
  constructor(
    nodeName: string,
    componentValueType: string,
    elementValueType: string,
    elementName: string,
    public binaryEvalFunc: (c: Component, e: Element) => Component
  ) {
    super(
      'Logic',
      nodeName,
      [
        new Socket(componentValueType, 'value'),
        new Socket(elementValueType, elementName)
      ],
      [new Socket(componentValueType, 'result')],
      (context: NodeEvalContext) => {
        context.writeOutput(
          'result',
          this.binaryEvalFunc(
            context.readInput('value'),
            context.readInput(elementName)
          )
        );
      }
    );
  }
}
