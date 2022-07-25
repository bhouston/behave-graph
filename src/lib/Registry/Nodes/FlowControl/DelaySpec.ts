import NumberSocket from './Sockets/Spec/NumberSocket';
import EvalSocket from './Sockets/Spec/EvalSocket';
import NodeSpec from './Nodes/Spec/NodeSpec';

// ASYNC - asynchronous evaluation
// also called "delay"

export class DelaySpec extends NodeSpec {
  constructor() {
    super(
      'flowcontrol',
      'delay',
      [
        new EvalSocket(),
        new NumberSocket('milliseconds'),
      ],
      [new EvalSocket()],
      (context, inputValues) => {
        // TODO: return a promise that results with an async delay - Wayne can you help with this?
        const outputValues = new Map<string, any>();
        outputValues.set('eval', true);
        return outputValues;
      },
    );
  }
}
