import NumberSocketSpec from './Sockets/Spec/NumberSocketSpec';
import EvalSocketSpec from './Sockets/Spec/EvalSocketSpec';
import NodeSpec from './Nodes/Spec/NodeSpec';


export class ForLoopSpec extends NodeSpec {
  constructor() {
    super(
      'flowcontrolgic',
      'forloop',
      [
        new EvalSocketSpec(),
        new NumberSocketSpec('startIndex'),
        new NumberSocketSpec('endIndex'),
      ],
      [
        new EvalSocketSpec('loopBody'),
        new NumberSocketSpec('index'),
        new EvalSocketSpec('completed'),
      ],
      (context, inputValues) => {
        // TODO: Figure out how to have multiple multiple "loop" evals each with an index
        // and then, once done, eval "complete"
        const outputValues = new Map<string, any>();
        outputValues.set('loopBody', true);
        outputValues.set('index', inputValues.get('startIndex'));
        return outputValues;
      }
    );
  }
}
