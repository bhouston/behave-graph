import FlowSocket from '../../../Sockets/Typed/FlowSocket';
import NumberSocket from '../../../Sockets/Typed/NumberSocket';
import Node from '../../Node';

export default class SetNodeVector3 extends Node {
  constructor(nodeName: string, public propertyName: string) {
    super(
      nodeName,
      [
        new FlowSocket(),
        new NumberSocket('nodeIndex'),
        new NumberSocket('x'),
        new NumberSocket('y'),
        new NumberSocket('z'),
      ],
      [new FlowSocket()],
      () => {
        // TODO: Set the x,y,z on the specified property.
        // const node = context.getSceneNodeByIndex(inputs['node']);
        // node.rotation.add(inputs['eulerDelta']);
      },
    );
  }
}
