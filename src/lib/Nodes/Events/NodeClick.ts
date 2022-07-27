import EvalSocket from '../../Sockets/Typed/EvalSocket';
import NumberSocket from '../../Sockets/Typed/NumberSocket';
import Node from '../Node';
import NodeEvalContext from '../NodeEvalContext';

export default class NodeClick extends Node {
  constructor() {
    super(
      'event/nodeClick',
      [],
      [
        new EvalSocket(),
        new NumberSocket('nodeIndex'),
      ],
      (context: NodeEvalContext, inputValues: Map<string, any>) => {
        const outputValues = new Map<string, any>();
        outputValues.set('eval', true);
        outputValues.set('nodeIndex', -1); // TODO: Replace with real value.
        return outputValues;
      },
    );
  }
}
