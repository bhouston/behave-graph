import EvalSocket from '../../../Sockets/Typed/EvalSocket';
import NumberSocket from '../../../Sockets/Typed/NumberSocket';
import Node from '../../Node';
import NodeEvalContext from '../../NodeEvalContext';

export default class SetNodeVector3 extends Node {
  constructor(nodeName: string, public propertyName: string) {
    super(
      nodeName,
      [
        new EvalSocket(),
        new NumberSocket('nodeIndex'),
        new NumberSocket('x'),
        new NumberSocket('y'),
        new NumberSocket('z'),
      ],
      [new EvalSocket()],
      (context: NodeEvalContext) => {
        // TODO: Set the x,y,z on the specified property.
        // const node = context.getSceneNodeByIndex(inputs['node']);
        // node.rotation.add(inputs['eulerDelta']);
        context.setOutputValue('eval', true);
      },
    );
  }
}
