import EvalSocket from '../../Sockets/Typed/EvalSocket';
import NumberSocket from '../../Sockets/Typed/NumberSocket';
import Node from '../Node';

import NodeEvalContext from '../NodeEvalContext';

// ASYNC - asynchronous evaluation
// also called "delay"

export default class Delay extends Node {
  constructor() {
    super(
      'flowcontrol/delay',
      [
        new EvalSocket(),
        new NumberSocket('milliseconds'),
      ],
      [new EvalSocket()],
      (context: NodeEvalContext, inputValues: Map<string, any>) => {
        // TODO: return a promise that results with an async delay - Wayne can you help with this?
        const outputValues = new Map<string, any>();
        outputValues.set('eval', true);
        return outputValues;
      },
    );
  }
}
