import NumberSocket from './Sockets/Spec/NumberSocket';
import NodeSpec from './Nodes/Spec/NodeSpec';


export class NumberSampleSpec extends NodeSpec {
  constructor() {
    super(
      'logic',
      'rnumberSample',
      [],
      [new NumberSocket('sample')],
      (context, inputValues) => {
        const outputValues = new Map<string, any>();
        outputValues.set('sample', Math.random());
        return outputValues;
      }
    );
  }
}
