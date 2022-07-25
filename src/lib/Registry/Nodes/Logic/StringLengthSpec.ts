import NumberSocket from './Sockets/Spec/NumberSocket';
import StringSocket from './Sockets/Spec/StringSocket';
import NodeSpec from './Nodes/Spec/NodeSpec';


export class StringLengthSpec extends NodeSpec {
  constructor() {
    super(
      'logic',
      'stringLength',
      [
        new StringSocket('text'),
      ],
      [new NumberSocket('length')],
      (context, inputValues) => {
        const outputValues = new Map<string, any>();
        outputValues.set('length', inputValues.get('text').length);
        return outputValues;
      }
    );
  }
}
