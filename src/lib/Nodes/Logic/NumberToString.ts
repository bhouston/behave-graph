import NumberSocket from './Sockets/Spec/NumberSocket';
import Node from '../../../Nodes/Node';

export class NumberToString extends Node {
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
      },
    );
  }
}
