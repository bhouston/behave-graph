import NodeSpec from './Nodes/Spec/NodeSpec';
import EvalSocket from './Sockets/Spec/EvalSocket';

export class TickEventSpec extends NodeSpec {
  constructor() {
    super(
      'events',
      'tick',
      [],
      [new EvalSocket()],
      (context, inputValues) => {
        const outputValues = new Map<string, any>();
        outputValues.set('eval', true);
        return outputValues;
      },
    );
  }
}
