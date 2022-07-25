import BooleanSocket from './Sockets/Spec/BooleanSocket';
import EvalSocket from './Sockets/Spec/EvalSocket';
import Node from '../../../Nodes/Node';

export class If extends Node {
  constructor() {
    super(
      'flowcontrol',
      'branch',
      [
        new EvalSocket(),
        new BooleanSocket('condition'),
      ],
      [
        new EvalSocket('true'),
        new EvalSocket('false'),
      ],
      (context, inputValues) => {
        // form 1:
        const outputValues = new Map<string, any>();
        if (inputValues.get('condition')) {
          outputValues.set('true', true);
        } else {
          outputValues.set('false', true);
        }
        return outputValues;
      },
    );
  }
}
