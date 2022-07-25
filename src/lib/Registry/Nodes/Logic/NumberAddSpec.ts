import NumberSocketSpec from './Sockets/Spec/NumberSocketSpec';
import NodeSpec from './Nodes/Spec/NodeSpec';


export class NumberAddSpec extends NodeSpec {
  constructor() {
    super(
      'logic',
      'numberAdd',
      [
        new NumberSocketSpec('a'),
        new NumberSocketSpec('b'),
      ],
      [new NumberSocketSpec('sum')],
      (context, inputValues) => {
        const outputValues = new Map<string, any>();
        outputValues.set('sum', inputValues.get('a') + inputValues.get('b'));
        return outputValues;
      }
    );
  }
}
