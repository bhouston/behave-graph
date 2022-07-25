import BooleanSocketSpec from './Sockets/Spec/BooleanSocketSpec';
import EvalSocketSpec from './Sockets/Spec/EvalSocketSpec';
import NodeSpec from './Nodes/Spec/NodeSpec';


export class IfSpec extends NodeSpec {
  constructor() {
    super(
      'flowcontrol',
      'if',
      [
        new EvalSocketSpec(),
        new BooleanSocketSpec('condition'),
      ],
      [
        new EvalSocketSpec('true'),
        new EvalSocketSpec('false'),
      ],
      (context, inputValues) => {
        // form 1:
        const outputValues = new Map<string, any>();
        if (inputValues.get('condition')) {
          outputValues.set('true', true);
        } else {
          outputValues.set('false', true);
        }
        return outputValues;
      }
    );
  }
}
