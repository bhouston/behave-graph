import NumberSocketSpec from './Sockets/Spec/NumberSocketSpec';
import NodeSpec from './Nodes/Spec/NodeSpec';


export class NumberToStringSpec extends NodeSpec {
  constructor() {
    super(
      'logic',
      'numberToString',
      [
        new NumberSocketSpec('a'),
      ],
      [new NumberSocketSpec('result')],
      (context, inputValues) => {
        const outputValues = new Map<string, any>();
        outputValues.set('result', inputValues.get('a').toString());
        return outputValues;
      }
    );
  }
}
