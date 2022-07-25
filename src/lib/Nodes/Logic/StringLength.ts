import NumberSocket from './Sockets/Spec/NumberSocket';
import StringSocket from './Sockets/Spec/StringSocket';
import Node from '../../../Nodes/Node';
import NodeEvalContext from '../NodeEvalContext';

export class StringLength extends Node {
  constructor() {
    super(
      'logic',
      'stringLength',
      [
        new StringSocket('text'),
      ],
      [new NumberSocket('length')],
      (context: NodeEvalContext, inputValues: Map<string, any>) => {
        const outputValues = new Map<string, any>();
        outputValues.set('length', inputValues.get('text').length);
        return outputValues;
      },
    );
  }
}
