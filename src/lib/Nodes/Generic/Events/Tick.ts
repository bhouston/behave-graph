import EvalSocket from '../../../Sockets/Typed/EvalSocket';
import Node from '../../Node';
import NodeEvalContext from '../../NodeEvalContext';

export default class Tick extends Node {
  constructor() {
    super(
      'event/tick',
      [],
      [new EvalSocket()],
      (context: NodeEvalContext, inputValues: Map<string, any>) => {
        const outputValues = new Map<string, any>();
        outputValues.set('eval', true);
        return outputValues;
      },
    );
  }
}
