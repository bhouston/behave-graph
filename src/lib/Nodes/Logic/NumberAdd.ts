import NumberSocket from './Sockets/Spec/NumberSocket';
import Node from '../../../Nodes/Node';

export class NumberAdd extends Node {
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
      },
    );
  }
}
