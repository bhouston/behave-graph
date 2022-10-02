import Node from '../../../Nodes/Node';
import NodeEvalContext from '../../../Nodes/NodeEvalContext';
import Socket from '../../../Sockets/Socket';

export default class GetElement<Component, Element> extends Node {
  constructor(
    nodeName: string,
    componentValueType: string,
    elementValueType: string,
    elementName: string,
    public binaryEvalFunc: (c: Component) => Element
  ) {
    super(
      'Logic',
      nodeName,
      [new Socket(componentValueType, 'value')],
      [new Socket(elementValueType, 'elementName')],
      (context: NodeEvalContext) => {
        context.writeOutput(
          'result',
          this.binaryEvalFunc(context.readInput('value'))
        );
      }
    );
  }
}
