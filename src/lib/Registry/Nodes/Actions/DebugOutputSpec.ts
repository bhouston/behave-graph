import StringSocketSpec from '../../../Specs/Sockets/StringSocketSpec';
import EvalSocketSpec from '../../../Specs/Sockets/EvalSocketSpec';
import NodeSpec from '../../../Specs/Nodes/NodeSpec';

export class DebugOutputSpec extends NodeSpec {
  constructor() {
    super(
      'action',
      'debugOutput',
      [new EvalSocketSpec(), new StringSocketSpec('text')],
      [new EvalSocketSpec()],
      (context, inputValues) => {
        console.log(`Debug Output: ${inputValues.get('text')}`);

        const outputValues = new Map<string, any>();
        outputValues.set('eval', true);
        return outputValues;
      },
    );
  }
}
