import NumberSocketSpec from './Sockets/Spec/NumberSocketSpec';
import StringSocketSpec from './Sockets/Spec/StringSocketSpec';
import NodeSpec from './Nodes/Spec/NodeSpec';


export class NodeRotationSpec extends NodeSpec {
  constructor() {
    super(
      'query',
      'nodeRotation',
      [new StringSocketSpec('nodeIndex')],
      [new NumberSocketSpec('xRotation'), new NumberSocketSpec('yRotation'), new NumberSocketSpec('zRotation')],
      (context, inputValues) => {
        const outputValues = new Map<string, any>();
        outputValues.set('xRotation', 0);
        outputValues.set('yRotation', 0);
        outputValues.set('zRotation', 0);
        return outputValues;
      }
    );
  }
}
