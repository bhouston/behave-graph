import NumberSocket from './Sockets/Spec/NumberSocket';
import StringSocket from './Sockets/Spec/StringSocket';
import NodeSpec from './Nodes/Spec/NodeSpec';


export class NodeRotationSpec extends NodeSpec {
  constructor() {
    super(
      'query',
      'nodeRotation',
      [new StringSocket('nodeIndex')],
      [new NumberSocket('xRotation'), new NumberSocket('yRotation'), new NumberSocket('zRotation')],
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
