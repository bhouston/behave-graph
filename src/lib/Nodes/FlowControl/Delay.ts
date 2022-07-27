import NumberSocket from './Sockets/Spec/NumberSocket';
import EvalSocket from './Sockets/Spec/EvalSocket';
import Node from '../../../Nodes/Node';
import NodeEvalContext from '../NodeEvalContext';
import { GlobalNodeRegistry } from '../GlobalNodeRegistry';

// ASYNC - asynchronous evaluation
// also called "delay"

export class Delay extends Node {
  constructor() {
    super(
      'flowcontrol/delay',
      [
        new EvalSocket(),
        new NumberSocket('milliseconds'),
      ],
      [new EvalSocket()],
      (context: NodeEvalContext, inputValues: Map<string, any>) => {
        // TODO: return a promise that results with an async delay - Wayne can you help with this?
        const outputValues = new Map<string, any>();
        outputValues.set('eval', true);
        return outputValues;
      },
    );
  }
}

GlobalNodeRegistry.add('flowcontrol/delay', () => new Delay());
