import NumberSocketSpec from './Sockets/Spec/NumberSocketSpec';
import StringSocketSpec from './Sockets/Spec/StringSocketSpec';
import NodeSpec from './Nodes/Spec/NodeSpec';


export class StringLengthSpec extends NodeSpec {
  constructor() {
    super(
      'logic',
      'stringLength',
      [
        new StringSocketSpec('text'),
      ],
      [new NumberSocketSpec('length')],
      (context, inputValues) => {
        const outputValues = new Map<string, any>();
        outputValues.set('length', inputValues.get('text').length);
        return outputValues;
      }
    );
  }
}
