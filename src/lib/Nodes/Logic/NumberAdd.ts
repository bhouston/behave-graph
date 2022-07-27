import NumberSocket from './Sockets/Spec/NumberSocket';
import Node from '../../../Nodes/Node';
import NodeEvalContext from '../NodeEvalContext';
import { GlobalNodeRegistry } from '../GlobalNodeRegistry';

export class NumberAdd extends Node {
  constructor() {
    super(
      'logic/numberAdd',
      [
        new NumberSocket('a'),
        new NumberSocket('b'),
      ],
      [new NumberSocket('sum')],
      (context: NodeEvalContext, inputValues: Map<string, any>) => {
        const outputValues = new Map<string, any>();
        outputValues.set('sum', inputValues.get('a') + inputValues.get('b'));
        return outputValues;
      },
    );
  }
}

GlobalNodeRegistry.add('logic/numberAdd', () => new NumberAdd());
