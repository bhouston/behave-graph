import { FlowSocket, Node, NumberSocket } from '../../../../../dist/lib/index';

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
