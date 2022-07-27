import EvalSocket from './Sockets/Spec/EvalSocket';
import Node from '../../../Nodes/Node';
import NodeEvalContext from '../NodeEvalContext';
import { GlobalNodeRegistry } from '../GlobalNodeRegistry';

// https://docs.unrealengine.com/4.27/en-US/ProgrammingAndScripting/Blueprints/UserGuide/FlowControl/

export class Sequence extends Node {
  constructor() {
    super(
      'flowcontrol/sequence',
      [new EvalSocket()],
      [
        new EvalSocket('1'),
        new EvalSocket('2'),
        new EvalSocket('2'),
      ],
      (context: NodeEvalContext, inputValues: Map<string, any>) => {
        // these outputs are fired sequentially in an async fashion but without delays.
        // Thus a promise is returned and it continually returns a promise until each of the sequences has been executed.
        const outputValues = new Map<string, any>();
        outputValues.set('1', true);
        return outputValues;
      },
    );
  }
}

GlobalNodeRegistry.add('flowcontrol/sequence', () => new Sequence());
