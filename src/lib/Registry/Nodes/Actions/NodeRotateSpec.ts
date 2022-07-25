import NumberSocketSpec from '../../Specs/Sockets/NumberSocketSpec';
import EvalSocketSpec from '../../Specs/Sockets/EvalSocketSpec';
import NodeSpec from '../../Specs/Nodes/NodeSpec';

export class NodeRotateSpec extends NodeSpec {
  constructor() {
    super(
      'action',
      'nodeRotation',
      [
        new EvalSocketSpec(),
        new NumberSocketSpec('nodeIndex'),
        new NumberSocketSpec('xRotation'),
        new NumberSocketSpec('yRotation'),
        new NumberSocketSpec('zRotation'),
      ],
      [new EvalSocketSpec()],
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
