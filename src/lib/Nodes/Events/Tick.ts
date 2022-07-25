import Node from '../../../Nodes/Node';
import EvalSocket from './Sockets/Spec/EvalSocket';

export class Tick extends Node {
  constructor() {
    super(
      'events',
      'tick',
      [],
      [new EvalSocket()],
      (context, inputValues) => {
        const outputValues = new Map<string, any>();
        outputValues.set('eval', true);
        return outputValues;
      },
    );
  }
}
