/* eslint-disable max-len */

import { In0Out1FuncNode } from '../../Nodes/Templates/In0Out1FuncNode.js';
import { In1Out1FuncNode } from '../../Nodes/Templates/In1Out1FuncNode.js';
import { In2Out1FuncNode } from '../../Nodes/Templates/In2Out1FuncNode.js';
import { Registry } from '../../Registry.js';
import { Log } from './Actions/Log.js';
import { SetVariable } from './Actions/SetVariable.js';
import { TriggerCustomEvent } from './Actions/TriggerCustomEvent.js';
import { OnCustomEvent } from './Events/OnCustomEvent.js';
import { OnLifecycleEnd } from './Events/OnLifecycleEnd.js';
import { OnLifecycleStart } from './Events/OnLifecycleStart.js';
import { OnLifecycleTick } from './Events/OnLifecycleTick.js';
import { OnVariableChanged } from './Events/OnVariableChanged.js';
import { Branch } from './Flow/Branch.js';
import { FlipFlop } from './Flow/FlipFlop.js';
import { ForLoop } from './Flow/ForLoop.js';
import { Sequence } from './Flow/Sequence.js';
import { GetVariable } from './Queries/GetVariable.js';
import { Delay } from './Time/Delay.js';

export function registerCoreProfile(registry: Registry) {
  const { nodes, values } = registry;

  // actions

  nodes.register('action/log', () => new Log());

  // events

  nodes.register('lifecycle/start', () => new OnLifecycleStart());
  nodes.register('lifecycle/end', () => new OnLifecycleEnd());
  nodes.register('lifecycle/tick', () => new OnLifecycleTick());

  // flow control

  nodes.register('flow/branch', () => new Branch());
  nodes.register('flow/flipFlop', () => new FlipFlop());
  nodes.register('flow/forLoop', () => new ForLoop());
  nodes.register('flow/sequence', () => new Sequence());

  // time

  nodes.register('time/delay', () => new Delay());

  // logic: constants

  nodes.register(
    'logic/boolean',
    () =>
      new In1Out1FuncNode<boolean, boolean>(
        'logic/boolean',
        'boolean',
        'boolean',
        (a) => a
      )
  );
  nodes.register(
    'logic/float',
    () =>
      new In1Out1FuncNode<number, number>(
        'logic/float',
        'float',
        'float',
        (a) => a
      )
  );
  nodes.register(
    'logic/integer',
    () =>
      new In1Out1FuncNode<bigint, bigint>(
        'logic/integer',
        'integer',
        'integer',
        (a) => a
      )
  );
  nodes.register(
    'logic/string',
    () =>
      new In1Out1FuncNode<string, string>(
        'logic/string',
        'string',
        'string',
        (a) => a
      )
  );

  // logic: boolean logic

  nodes.register(
    'logic/not/boolean',
    () =>
      new In1Out1FuncNode<boolean, boolean>(
        'logic/not/boolean',
        'boolean',
        'boolean',
        (a) => !a
      )
  );
  nodes.register(
    'logic/or/boolean',
    () =>
      new In2Out1FuncNode<boolean, boolean, boolean>(
        'logic/or/boolean',
        'boolean',
        'boolean',
        'boolean',
        (a, b) => a || b
      )
  );
  nodes.register(
    'logic/and/boolean',
    () =>
      new In2Out1FuncNode<boolean, boolean, boolean>(
        'logic/and/boolean',
        'boolean',
        'boolean',
        'boolean',
        (a, b) => a && b
      )
  );

  // logic: arithmetic

  nodes.register(
    'logic/add/float',
    () =>
      new In2Out1FuncNode<number, number, number>(
        'logic/add/float',
        'float',
        'float',
        'float',
        (a, b) => a + b
      )
  );
  nodes.register(
    'logic/subtract/float',
    () =>
      new In2Out1FuncNode<number, number, number>(
        'logic/subtract/float',
        'float',
        'float',
        'float',
        (a, b) => a - b
      )
  );
  nodes.register(
    'logic/multiply/float',
    () =>
      new In2Out1FuncNode<number, number, number>(
        'logic/multiply/float',
        'float',
        'float',
        'float',
        (a, b) => a * b
      )
  );
  nodes.register(
    'logic/divide/float',
    () =>
      new In2Out1FuncNode<number, number, number>(
        'logic/divide/float',
        'float',
        'float',
        'float',
        (a, b) => a / b
      )
  );
  nodes.register(
    'logic/pow/float',
    () =>
      new In2Out1FuncNode<number, number, number>(
        'logic/pow/float',
        'float',
        'float',
        'float',
        (a, b) => a ** b
      )
  );
  nodes.register(
    'logic/negate/float',
    () =>
      new In1Out1FuncNode<number, number>(
        'logic/negate/float',
        'float',
        'float',
        (a) => -a
      )
  );
  nodes.register(
    'logic/sqrt/float',
    () =>
      new In1Out1FuncNode<number, number>(
        'logic/sqrt/float',
        'float',
        'float',
        (a) => Math.sqrt(a)
      )
  );
  nodes.register(
    'logic/modulus/float',
    () =>
      new In2Out1FuncNode<number, number, number>(
        'logic/modulus/float',
        'float',
        'float',
        'float',
        (a, b) => a % b
      )
  );

  nodes.register(
    'logic/add/integer',
    () =>
      new In2Out1FuncNode<bigint, bigint, bigint>(
        'logic/add/integer',
        'integer',
        'integer',
        'integer',
        (a, b) => a + b
      )
  );
  nodes.register(
    'logic/subtract/integer',
    () =>
      new In2Out1FuncNode<bigint, bigint, bigint>(
        'logic/subtract/integer',
        'integer',
        'integer',
        'integer',
        (a, b) => a - b
      )
  );
  nodes.register(
    'logic/multiply/integer',
    () =>
      new In2Out1FuncNode<bigint, bigint, bigint>(
        'logic/multiply/integer',
        'integer',
        'integer',
        'integer',
        (a, b) => a * b
      )
  );
  nodes.register(
    'logic/divide/integer',
    () =>
      new In2Out1FuncNode<bigint, bigint, bigint>(
        'logic/divide/integer',
        'integer',
        'integer',
        'integer',
        (a, b) => a / b
      )
  );
  nodes.register(
    'logic/negate/integer',
    () =>
      new In1Out1FuncNode<bigint, bigint>(
        'logic/negate/integer',
        'integer',
        'integer',
        (a) => -a
      )
  );
  nodes.register(
    'logic/modulus/integer',
    () =>
      new In2Out1FuncNode<bigint, bigint, bigint>(
        'logic/modulus/integer',
        'integer',
        'integer',
        'integer',
        (a, b) => a % b
      )
  );
  nodes.register(
    'logic/toFloat/integer',
    () =>
      new In1Out1FuncNode<bigint, number>(
        'logic/toFloat/integer',
        'integer',
        'float',
        (a) => Number(a)
      )
  );

  // logic: exponential

  nodes.register(
    'logic/floatE',
    () => new In0Out1FuncNode<number>('logic/floatE', 'float', () => Math.E)
  );
  nodes.register(
    'logic/exp/float',
    () =>
      new In1Out1FuncNode<number, number>(
        'logic/exp/float',
        'float',
        'float',
        (a) => Math.exp(a)
      )
  );
  nodes.register(
    'logic/log/float',
    () =>
      new In1Out1FuncNode<number, number>(
        'logic/log/float',
        'float',
        'float',
        (a) => Math.log(a)
      )
  );
  nodes.register(
    'logic/log2/float',
    () =>
      new In1Out1FuncNode<number, number>(
        'logic/log2/float',
        'float',
        'float',
        (a) => Math.log2(a)
      )
  );
  nodes.register(
    'logic/log10/float',
    () =>
      new In1Out1FuncNode<number, number>(
        'logic/log10/float',
        'float',
        'float',
        (a) => Math.log10(a)
      )
  );

  // logic: trigonometry

  nodes.register(
    'logic/pi/float',
    () => new In0Out1FuncNode<number>('logic/pi/float', 'float', () => Math.PI)
  );
  nodes.register(
    'logic/sin/float',
    () =>
      new In1Out1FuncNode<number, number>(
        'logic/sin/float',
        'float',
        'float',
        (a) => Math.sin(a)
      )
  );
  nodes.register(
    'logic/asin/float',
    () =>
      new In1Out1FuncNode<number, number>(
        'logic/asin/float',
        'float',
        'float',
        (a) => Math.asin(a)
      )
  );
  nodes.register(
    'logic/cos/float',
    () =>
      new In1Out1FuncNode<number, number>(
        'logic/cos/float',
        'float',
        'float',
        (a) => Math.cos(a)
      )
  );
  nodes.register(
    'logic/acos/float',
    () =>
      new In1Out1FuncNode<number, number>(
        'logic/acos/float',
        'float',
        'float',
        (a) => Math.acos(a)
      )
  );
  nodes.register(
    'logic/tan/float',
    () =>
      new In1Out1FuncNode<number, number>(
        'logic/tan/float',
        'float',
        'float',
        (a) => Math.tan(a)
      )
  );
  nodes.register(
    'logic/atan/float',
    () =>
      new In1Out1FuncNode<number, number>(
        'logic/atan/float',
        'float',
        'float',
        (a) => Math.atan(a)
      )
  );

  // logic: ranges
  nodes.register(
    'logic/min/integer',
    () =>
      new In2Out1FuncNode<bigint, bigint, bigint>(
        'logic/min/integer',
        'integer',
        'integer',
        'integer',
        (a, b) => (a > b ? b : a)
      )
  );
  nodes.register(
    'logic/max/integer',
    () =>
      new In2Out1FuncNode<bigint, bigint, bigint>(
        'logic/max/integer',
        'integer',
        'integer',
        'integer',
        (a, b) => (a > b ? a : b)
      )
  );

  nodes.register(
    'logic/min/float',
    () =>
      new In2Out1FuncNode<number, number, number>(
        'logic/min/float',
        'float',
        'float',
        'float',
        (a, b) => Math.min(a, b)
      )
  );
  nodes.register(
    'logic/max/float',
    () =>
      new In2Out1FuncNode<number, number, number>(
        'logic/max/float',
        'float',
        'float',
        'float',
        (a, b) => Math.max(a, b)
      )
  );
  nodes.register(
    'logic/sign/float',
    () =>
      new In1Out1FuncNode<number, bigint>(
        'logic/sign/float',
        'float',
        'integer',
        (a) => BigInt(Math.sign(a))
      )
  );
  nodes.register(
    'logic/abs/float',
    () =>
      new In1Out1FuncNode<number, number>(
        'logic/abs/float',
        'float',
        'float',
        (a) => Math.abs(a)
      )
  );
  nodes.register(
    'logic/floor/float',
    () =>
      new In1Out1FuncNode<number, bigint>(
        'logic/floor/float',
        'float',
        'integer',
        (a) => BigInt(Math.floor(a))
      )
  );
  nodes.register(
    'logic/ceil/float',
    () =>
      new In1Out1FuncNode<number, bigint>(
        'logic/ceil/float',
        'float',
        'integer',
        (a) => BigInt(Math.ceil(a))
      )
  );
  nodes.register(
    'logic/round/float',
    () =>
      new In1Out1FuncNode<number, bigint>(
        'logic/round/float',
        'float',
        'integer',
        (a) => BigInt(Math.round(a))
      )
  );
  nodes.register(
    'logic/trunc/float',
    () =>
      new In1Out1FuncNode<number, bigint>(
        'logic/trunc/float',
        'float',
        'integer',
        (a) => BigInt(Math.trunc(a))
      )
  );

  // logic: sampling

  nodes.register(
    'logic/sample/float',
    () =>
      new In0Out1FuncNode<number>('logic/sample/float', 'float', () =>
        Math.random()
      )
  );

  // logic: comparison

  nodes.register(
    'logic/equal/float',
    () =>
      new In2Out1FuncNode<number, number, boolean>(
        'logic/equal/float',
        'float',
        'float',
        'boolean',
        (a, b) => a === b
      )
  );
  nodes.register(
    'logic/greaterThan/float',
    () =>
      new In2Out1FuncNode<number, number, boolean>(
        'logic/greaterThan/float',
        'float',
        'float',
        'boolean',
        (a, b) => a > b
      )
  );
  nodes.register(
    'logic/greaterThaOrEqual/float',
    () =>
      new In2Out1FuncNode<number, number, boolean>(
        'logic/greaterThaOrEqual/float',
        'float',
        'float',
        'boolean',
        (a, b) => a >= b
      )
  );
  nodes.register(
    'logic/lessThan/float',
    () =>
      new In2Out1FuncNode<number, number, boolean>(
        'logic/lessThan/float',
        'float',
        'float',
        'boolean',
        (a, b) => a < b
      )
  );
  nodes.register(
    'logic/lessThaOrEqual/float',
    () =>
      new In2Out1FuncNode<number, number, boolean>(
        'logic/lessThaOrEqual/float',
        'float',
        'float',
        'boolean',
        (a, b) => a <= b
      )
  );

  nodes.register(
    'logic/equal/integer',
    () =>
      new In2Out1FuncNode<bigint, bigint, boolean>(
        'logic/equal/integer',
        'integer',
        'integer',
        'boolean',
        (a, b) => a === b
      )
  );
  nodes.register(
    'logic/greaterThan/integer',
    () =>
      new In2Out1FuncNode<bigint, bigint, boolean>(
        'logic/greaterThan/integer',
        'integer',
        'integer',
        'boolean',
        (a, b) => a > b
      )
  );
  nodes.register(
    'logic/greaterThaOrEqual/integer',
    () =>
      new In2Out1FuncNode<bigint, bigint, boolean>(
        'logic/greaterThaOrEqual/integer',
        'integer',
        'integer',
        'boolean',
        (a, b) => a >= b
      )
  );
  nodes.register(
    'logic/lessThan/integer',
    () =>
      new In2Out1FuncNode<bigint, bigint, boolean>(
        'logic/lessThan/integer',
        'integer',
        'integer',
        'boolean',
        (a, b) => a < b
      )
  );
  nodes.register(
    'logic/lessThaOrEqual/integer',
    () =>
      new In2Out1FuncNode<bigint, bigint, boolean>(
        'logic/lessThaOrEqual/integer',
        'integer',
        'integer',
        'boolean',
        (a, b) => a <= b
      )
  );

  nodes.register(
    'logic/isNan/float',
    () =>
      new In1Out1FuncNode<number, boolean>(
        'logic/isNan/float',
        'float',
        'boolean',
        (a) => Number.isNaN(a)
      )
  );
  nodes.register(
    'logic/isInf/float',
    () =>
      new In1Out1FuncNode<number, boolean>(
        'logic/isInf/float',
        'float',
        'boolean',
        (a) => !Number.isFinite(a) && !Number.isNaN(a)
      )
  );

  // logic: string utilities

  nodes.register(
    'logic/concat/string',
    () =>
      new In2Out1FuncNode<string, string, string>(
        'logic/concat/string',
        'string',
        'string',
        'string',
        (a, b) => a.concat(b)
      )
  );
  nodes.register(
    'logic/includes/string',
    () =>
      new In2Out1FuncNode<string, string, boolean>(
        'logic/includes/string',
        'string',
        'string',
        'boolean',
        (a, b) => a.includes(b)
      )
  );

  // string - number conversion

  nodes.register(
    'logic/toString/float',
    () =>
      new In1Out1FuncNode<number, string>(
        'logic/toString/float',
        'float',
        'string',
        (a) => values.get('float').serialize(a)
      )
  );

  nodes.register(
    'logic/toString/integer',
    () =>
      new In1Out1FuncNode<bigint, string>(
        'logic/toString/integer',
        'integer',
        'string',
        (a: bigint) => values.get('integer').serialize(a)
      )
  );

  nodes.register(
    'logic/toFloat/string',
    () =>
      new In1Out1FuncNode<string, number>(
        'logic/toFloat/string',
        'string',
        'float',
        (a: string) => values.get('float').deserialize(a)
      )
  );
  nodes.register(
    'logic/toInteger/string',
    () =>
      new In1Out1FuncNode<string, bigint>(
        'logic/toInteger/string',
        'string',
        'integer',
        (a: string) => values.get('integer').deserialize(a)
      )
  );

  nodes.register(
    'logic/stringLength',
    () =>
      new In1Out1FuncNode<string, number>(
        'logic/stringLength',
        'string',
        'float',
        (a) => a.length
      )
  );

  // custom events

  nodes.register('event/customEvent', () => new OnCustomEvent());
  nodes.register('action/triggerCustomEvent', () => new TriggerCustomEvent());

  // variables

  nodes.register(
    'variable/set/boolean',
    () => new SetVariable('variable/set/boolean', 'boolean')
  );
  nodes.register(
    'variable/get/boolean',
    () => new GetVariable('variable/get/boolean', 'boolean')
  );
  nodes.register(
    'variable/onChanged/boolean',
    () => new OnVariableChanged('variable/onChanged/boolean', 'boolean')
  );

  nodes.register(
    'variable/set/float',
    () => new SetVariable('variable/set/float', 'float')
  );
  nodes.register(
    'variable/get/float',
    () => new GetVariable('variable/get/float', 'float')
  );
  nodes.register(
    'variable/onChanged/float',
    () => new OnVariableChanged('variable/onChanged/float', 'float')
  );

  nodes.register(
    'variable/set/integer',
    () => new SetVariable('variable/set/integer', 'integer')
  );
  nodes.register(
    'variable/get/integer',
    () => new GetVariable('variable/get/integer', 'integer')
  );
  nodes.register(
    'variable/onChanged/integer',
    () => new OnVariableChanged('variable/onChanged/integer', 'integer')
  );

  nodes.register(
    'variable/set/string',
    () => new SetVariable('variable/set/string', 'string')
  );
  nodes.register(
    'variable/get/string',
    () => new GetVariable('variable/get/string', 'string')
  );
  nodes.register(
    'variable/onChanged/string',
    () => new OnVariableChanged('variable/onChanged/string', 'string')
  );

  return registry;
}
