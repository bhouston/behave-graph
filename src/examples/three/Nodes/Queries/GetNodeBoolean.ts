import {
  BooleanSocket, Node, NodeEvalContext, StringSocket,
} from '../../../../../dist/lib/index';

export default class GetNodeBoolean extends Node {
  constructor(nodeName: string, public propertyName: string) {
    super(
      nodeName,
      [new StringSocket('nodeIndex')],
      [new BooleanSocket('result')],
      (context:NodeEvalContext) => {
        // TODO: actually get node visibility
        context.setOutputValue('result', true);
      },
    );
  }
}
