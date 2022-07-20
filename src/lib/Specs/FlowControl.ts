import { SocketValueType } from '../Core/Sockets/SocketValueType';
import SocketSpec from '../Core/Sockets/Spec/SocketSpec';
import NumberSocketSpec from '../Core/Sockets/Spec/NumberSocketSpec';
import BooleanSocketSpec from '../Core/Sockets/Spec/BooleanSocketSpec';
import EvalSocketSpec from '../Core/Sockets/Spec/EvalSocketSpec';
import NodeSpec from '../Core/Nodes/Spec/NodeSpec';

import { GlobalNodeSpecRegistry } from './NodeSpecRegistry';

GlobalNodeSpecRegistry.add(
  new NodeSpec(
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
    },
  ),
);

// ASYNC - asynchronous evaluation

// also called "delay"
GlobalNodeSpecRegistry.add(
  new NodeSpec(
    'flowcontrol',
    'sleep',
    [
      new EvalSocketSpec(),
      new NumberSocketSpec('milliseconds'),
    ],
    [new EvalSocketSpec()],
    (context, inputValues) => {
      // TODO: return a promise that results with an async delay - Wayne can you help with this?
      const outputValues = new Map<string, any>();
      outputValues.set('eval', true);
      return outputValues;
    },
  ),
);

// https://docs.unrealengine.com/4.27/en-US/ProgrammingAndScripting/Blueprints/UserGuide/FlowControl/
GlobalNodeSpecRegistry.add(
  new NodeSpec(
    'flowcontrol',
    'sequence',
    [new EvalSocketSpec()],
    [
      new EvalSocketSpec('1'),
      new EvalSocketSpec('2'),
      new EvalSocketSpec('2'),
    ],
    (context, inputValues) => {
      // these outputs are fired sequentially in an async fashion but without delays.  Thus a promise is returned and it continually returns a promise until each of the sequences has been executed.
      const outputValues = new Map<string, any>();
      outputValues.set('1', true);
      return outputValues;
    },
  ),
);

GlobalNodeSpecRegistry.add(
  new NodeSpec(
    'loflowcontrolgic',
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
    },
  ),
);
