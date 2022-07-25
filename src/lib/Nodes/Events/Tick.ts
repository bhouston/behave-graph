import Node from '../../../Nodes/Node';
import NodeEvalContext from '../NodeEvalContext';
import EvalSocket from './Sockets/Spec/EvalSocket';

export class Tick extends Node {
  constructor() {
    super(
      'events',
      'tick',
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
