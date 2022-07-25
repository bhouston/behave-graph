import NodeSpec from './Nodes/Spec/NodeSpec';
import NumberSocket from './Sockets/Spec/NumberSocket';
import EvalSocket from './Sockets/Spec/EvalSocket';

export class NodeClickSpec extends NodeSpec {
  constructor() {
    super(
      'events',
      'nodeClick',
      [],
      [
        new EvalSocket(),
        new NumberSocket('nodeIndex'),
      ],
      (context, inputValues) => {
        const outputValues = new Map<string, any>();
        outputValues.set('eval', true);
        outputValues.set('nodeIndex', -1); // TODO: Replace with real value.
        return outputValues;
      },
    );
  }
}
