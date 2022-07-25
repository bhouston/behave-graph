import NumberSocket from './Sockets/Spec/NumberSocket';
import EvalSocket from './Sockets/Spec/EvalSocket';
import Node from '../../../Nodes/Node';
import NodeEvalContext from '../NodeEvalContext';

export class ForLoop extends Node {
  constructor() {
    super(
      'flowcontrolgic',
      'forloop',
      [
        new EvalSocket(),
        new NumberSocket('startIndex'),
        new NumberSocket('endIndex'),
      ],
      [
        new EvalSocket('loopBody'),
        new NumberSocket('index'),
        new EvalSocket('completed'),
      ],
      (context: NodeEvalContext, inputValues: Map<string, any>) => {
        // TODO: Figure out how to have multiple multiple "loop" evals each with an index
        // and then, once done, eval "complete"
        const outputValues = new Map<string, any>();
        outputValues.set('loopBody', true);
        outputValues.set('index', inputValues.get('startIndex'));
        return outputValues;
      },
    );
  }
}
