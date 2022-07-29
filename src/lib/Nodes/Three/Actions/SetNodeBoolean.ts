import Node from '../../Node';
import NodeEvalContext from '../../NodeEvalContext';
import BooleanSocket from '../../../Sockets/Typed/BooleanSocket';
import FlowSocket from '../../../Sockets/Typed/FlowSocket';
import NumberSocket from '../../../Sockets/Typed/NumberSocket';

export default class SetNodeBoolean extends Node {
  constructor(nodeName: string, public propertyName: string) {
    super(
      nodeName,
      [new FlowSocket(), new NumberSocket('nodeIndex'), new BooleanSocket('value')],
      [new FlowSocket()],
      (context: NodeEvalContext) => {
        // const node = context.getSceneNodeByIndex(inputs['node']);
        // node.visible = context.getInputValue('visible');
        context.setOutputValue('eval', true);
      },
    );
  }
};
