import {
  BooleanSocket, FlowSocket, Node, NumberSocket,
} from '../../../../../dist/lib/index';

export default class SetNodeBoolean extends Node {
  constructor(nodeName: string, public propertyName: string) {
    super(
      'Three',
      nodeName,
      [new FlowSocket(), new NumberSocket('nodeIndex'), new BooleanSocket('value')],
      [new FlowSocket()],
      () => {
        // const node = context.getSceneNodeByIndex(inputs['node']);
        // node.visible = context.getInputValue('visible');
      },
    );
  }
};
