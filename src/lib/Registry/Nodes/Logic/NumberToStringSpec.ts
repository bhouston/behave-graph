import NumberSocket from './Sockets/Spec/NumberSocket';
import NodeSpec from './Nodes/Spec/NodeSpec';


export class NumberToStringSpec extends NodeSpec {
  constructor() {
    super(
      'logic',
      'numberToString',
      [
        new NumberSocket('a'),
      ],
      [new NumberSocket('result')],
      (context, inputValues) => {
        const outputValues = new Map<string, any>();
        outputValues.set('result', inputValues.get('a').toString());
        return outputValues;
      }
    );
  }
}
