import NumberSocket from './Sockets/Spec/NumberSocket';
import Node from '../../../Nodes/Node';
import NodeEvalContext from '../NodeEvalContext';
import { GlobalNodeRegistry } from '../GlobalNodeRegistry';

export class NumberToString extends Node {
  constructor() {
    super(
      'logic/numberToString',
      [
        new NumberSocket('a'),
      ],
      [new NumberSocket('result')],
      (context: NodeEvalContext, inputValues: Map<string, any>) => {
        const outputValues = new Map<string, any>();
        outputValues.set('result', inputValues.get('a').toString());
        return outputValues;
      },
    );
  }
}

GlobalNodeRegistry.add('logic/numberToString', () => new NumberToString());
