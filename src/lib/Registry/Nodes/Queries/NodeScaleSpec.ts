import NumberSocketSpec from './Sockets/Spec/NumberSocketSpec';
import StringSocketSpec from './Sockets/Spec/StringSocketSpec';
import NodeSpec from './Nodes/Spec/NodeSpec';


export class NodeScaleSpec extends NodeSpec {
  constructor() {
    super(
      'query',
      'nodeScale',
      [new StringSocketSpec('nodeIndex')],
      [new NumberSocketSpec('xScale'), new NumberSocketSpec('yScale'), new NumberSocketSpec('zScale')],
      (context, inputValues) => {
        const outputValues = new Map<string, any>();
        outputValues.set('xScale', 0);
        outputValues.set('yScale', 0);
        outputValues.set('zScale', 0);
        return outputValues;
      }
    );
  }
}
