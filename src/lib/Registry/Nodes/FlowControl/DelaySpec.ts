import NumberSocketSpec from './Sockets/Spec/NumberSocketSpec';
import EvalSocketSpec from './Sockets/Spec/EvalSocketSpec';
import NodeSpec from './Nodes/Spec/NodeSpec';

// ASYNC - asynchronous evaluation
// also called "delay"

export class DelaySpec extends NodeSpec {
  constructor() {
    super(
      'flowcontrol',
      'delay',
      [
        new EvalSocketSpec(),
        new NumberSocketSpec('milliseconds'),
      ],
      [new EvalSocketSpec()],
      (context, inputValues) => {
        // TODO: return a promise that results with an async delay - Wayne can you help with this?
        const outputValues = new Map<string, any>();
        outputValues.set('eval', true);
        return outputValues;
      }
    );
  }
}
