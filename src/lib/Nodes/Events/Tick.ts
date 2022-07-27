import Node from '../../../Nodes/Node';
import { GlobalNodeRegistry } from '../GlobalNodeRegistry';
import NodeEvalContext from '../NodeEvalContext';
import EvalSocket from './Sockets/Spec/EvalSocket';

export class Tick extends Node {
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

GlobalNodeRegistry.add('event/tick', () => new Tick());
