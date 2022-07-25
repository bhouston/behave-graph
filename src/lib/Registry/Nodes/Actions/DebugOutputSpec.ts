import StringSocket from '../../../Specs/Sockets/StringSocket';
import EvalSocket from '../../../Specs/Sockets/EvalSocket';
import NodeSpec from '../../../Specs/Nodes/NodeSpec';

export class DebugOutputSpec extends NodeSpec {
  constructor() {
    super(
      'action',
      'debugOutput',
      [new EvalSocket(), new StringSocket('text')],
      [new EvalSocket()],
      (context, inputValues) => {
        console.log(`Debug Output: ${inputValues.get('text')}`);

        const outputValues = new Map<string, any>();
        outputValues.set('eval', true);
        return outputValues;
      },
    );
  }
}
