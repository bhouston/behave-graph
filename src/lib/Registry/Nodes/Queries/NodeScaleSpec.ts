import NumberSocket from './Sockets/Spec/NumberSocket';
import StringSocket from './Sockets/Spec/StringSocket';
import NodeSpec from './Nodes/Spec/NodeSpec';


export class NodeScaleSpec extends NodeSpec {
  constructor() {
    super(
      'query',
      'nodeScale',
      [new StringSocket('nodeIndex')],
      [new NumberSocket('xScale'), new NumberSocket('yScale'), new NumberSocket('zScale')],
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
