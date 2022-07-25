import NumberSocket from '../../Specs/Sockets/NumberSocket';
import EvalSocket from '../../Specs/Sockets/EvalSocket';
import Node from '../Node';

export class SetNodeRotation extends Node {
  constructor() {
    super(
      'action',
      'setNodeRotation',
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
