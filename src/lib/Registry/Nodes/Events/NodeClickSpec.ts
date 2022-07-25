import NodeSpec from './Nodes/Spec/NodeSpec';
import NumberSocketSpec from './Sockets/Spec/NumberSocketSpec';
import EvalSocketSpec from './Sockets/Spec/EvalSocketSpec';


export class NodeClickSpec extends NodeSpec {
  constructor() {
    super(
      'events',
      'nodeClick',
      [],
      [
        new EvalSocketSpec(),
        new NumberSocketSpec('nodeIndex'),
      ],
      (context, inputValues) => {
        const outputValues = new Map<string, any>();
        outputValues.set('eval', true);
        outputValues.set('nodeIndex', -1); // TODO: Replace with real value.
        return outputValues;
      }
    );
  }
}
