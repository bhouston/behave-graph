import NumberSocket from './Sockets/Spec/NumberSocket';
import NodeSpec from './Nodes/Spec/NodeSpec';


export class NumberAddSpec extends NodeSpec {
  constructor() {
    super(
      'logic',
      'numberAdd',
      [
        new NumberSocket('a'),
        new NumberSocket('b'),
      ],
      [new NumberSocket('sum')],
      (context, inputValues) => {
        const outputValues = new Map<string, any>();
        outputValues.set('sum', inputValues.get('a') + inputValues.get('b'));
        return outputValues;
      }
    );
  }
}
