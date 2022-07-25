import NumberSocket from '../../Specs/Sockets/NumberSocket';
import EvalSocket from '../../Specs/Sockets/EvalSocket';
import NodeSpec from '../../Specs/Nodes/NodeSpec';

export class NodeRotateSpec extends NodeSpec {
  constructor() {
    super(
      'action',
      'nodeRotation',
      [
        new EvalSocket(),
        new NumberSocket('nodeIndex'),
        new NumberSocket('xRotation'),
        new NumberSocket('yRotation'),
        new NumberSocket('zRotation'),
      ],
      [new EvalSocket()],
      (context, inputValues) => {
        const outputValues = new Map<string, any>();
        outputValues.set('eval', true);
        return outputValues;
        // const node = context.getSceneNodeByIndex(inputs['node']);
        // node.rotation.add(inputs['eulerDelta']);
        // return { eval: true };
      },
    );
  }
}
