import EvalSocket from './Sockets/Spec/EvalSocket';
import NodeSpec from './Nodes/Spec/NodeSpec';

// https://docs.unrealengine.com/4.27/en-US/ProgrammingAndScripting/Blueprints/UserGuide/FlowControl/

export class SequenceSpec extends NodeSpec {
  constructor() {
    super(
      'flowcontrol',
      'sequence',
      [new EvalSocket()],
      [
        new EvalSocket('1'),
        new EvalSocket('2'),
        new EvalSocket('2'),
      ],
      (context, inputValues) => {
        // these outputs are fired sequentially in an async fashion but without delays.  Thus a promise is returned and it continually returns a promise until each of the sequences has been executed.
        const outputValues = new Map<string, any>();
        outputValues.set('1', true);
        return outputValues;
      },
    );
  }
}
