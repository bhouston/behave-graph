import NodeSpec from './Nodes/Spec/NodeSpec';
import EvalSocketSpec from './Sockets/Spec/EvalSocketSpec';


export class TickEventSpec extends NodeSpec {
  constructor() {
    super(
      'events',
      'tick',
      [],
      [new EvalSocketSpec()],
      (context, inputValues) => {
        const outputValues = new Map<string, any>();
        outputValues.set('eval', true);
        return outputValues;
      }
    );
  }
}
