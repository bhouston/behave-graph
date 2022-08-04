import {
  Node, NodeEvalContext, NumberSocket, StringSocket,
} from '../../../../../dist/lib/index';

export default class GetNodeVector3 extends Node {
  constructor(nodeName: string, public propertyName: string) {
    super(
      nodeName,
      [new StringSocket('nodeIndex')],
      [new NumberSocket('x'), new NumberSocket('y'), new NumberSocket('z')],
      (context:NodeEvalContext) => {
        // TODO: Actually read property of the node
        context.setOutputValue('x', 0);
        context.setOutputValue('y', 0);
        context.setOutputValue('z', 0);
      },
    );
  }
}
