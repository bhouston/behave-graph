import NumberSocketSpec from './Sockets/Spec/NumberSocketSpec';
import NodeSpec from './Nodes/Spec/NodeSpec';


export class NumberSampleSpec extends NodeSpec {
  constructor() {
    super(
      'logic',
      'rnumberSample',
      [],
      [new NumberSocketSpec('sample')],
      (context, inputValues) => {
        const outputValues = new Map<string, any>();
        outputValues.set('sample', Math.random());
        return outputValues;
      }
    );
  }
}
