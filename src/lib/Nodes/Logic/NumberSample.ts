import NumberSocket from './Sockets/Spec/NumberSocket';
import Node from '../../../Nodes/Node';

export class NumberSample extends Node {
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
      },
    );
  }
}
