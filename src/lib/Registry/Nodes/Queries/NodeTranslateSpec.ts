import NumberSocketSpec from './Sockets/Spec/NumberSocketSpec';
import StringSocketSpec from './Sockets/Spec/StringSocketSpec';
import NodeSpec from './Nodes/Spec/NodeSpec';

export class NodeTranslateSpec extends NodeSpec {
  constructor() {
    super(
      'query',
      'nodeTranslate',
      [new StringSocketSpec('nodeIndex')],
      [new NumberSocketSpec('xTranslation'), new NumberSocketSpec('yTranslation'), new NumberSocketSpec('zTranslation')],
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
