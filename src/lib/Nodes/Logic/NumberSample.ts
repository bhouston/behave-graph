import NumberSocket from './Sockets/Spec/NumberSocket';
import Node from '../../../Nodes/Node';
import NodeEvalContext from '../NodeEvalContext';
import { GlobalNodeRegistry } from '../GlobalNodeRegistry';

export class NumberSample extends Node {
  constructor() {
    super(
      'logic/numberSample',
      [],
      [new NumberSocket('sample')],
      (context: NodeEvalContext, inputValues: Map<string, any>) => {
        const outputValues = new Map<string, any>();
        outputValues.set('sample', Math.random());
        return outputValues;
      },
    );
  }
}

GlobalNodeRegistry.add('logic/numberSample', () => new NumberSample());
