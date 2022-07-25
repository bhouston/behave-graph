import NumberSocket from './Sockets/Spec/NumberSocket';
import StringSocket from './Sockets/Spec/StringSocket';
import NodeSpec from './Nodes/Spec/NodeSpec';

export class NodeTranslateSpec extends NodeSpec {
  constructor() {
    super(
      'query',
      'nodeTranslate',
      [new StringSocket('nodeIndex')],
      [new NumberSocket('xTranslation'), new NumberSocket('yTranslation'), new NumberSocket('zTranslation')],
      (context, inputValues) => {
        const outputValues = new Map<string, any>();
        outputValues.set('xTranslation', 0);
        outputValues.set('yTranslation', 0);
        outputValues.set('zTranslation', 0);
        return outputValues;
      },
    );
  }
}
