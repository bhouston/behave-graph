import NumberSocket from './Sockets/Spec/NumberSocket';
import Node from '../../../Nodes/Node';
import NodeEvalContext from '../NodeEvalContext';

export class NumberSample extends Node {
  constructor() {
    super(
      'logic',
      'rnumberSample',
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
