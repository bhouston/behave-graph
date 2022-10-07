/* eslint-disable max-len */

import { In0Out1FuncNode } from '../../Nodes/Templates/In0Out1FuncNode';
import { In1Out1FuncNode } from '../../Nodes/Templates/In1Out1FuncNode';
import { In2Out1FuncNode } from '../../Nodes/Templates/In2Out1FuncNode';
import { Registry } from '../../Registry';
import { Log } from './Actions/Log';
import { SetVariable } from './Actions/SetVariable';
import { TriggerCustomEvent } from './Actions/TriggerCustomEvent';
import { OnCustomEvent } from './Events/OnCustomEvent';
import { OnLifecycleEnd } from './Events/OnLifecycleEnd';
import { OnLifecycleStart } from './Events/OnLifecycleStart';
import { OnLifecycleTick } from './Events/OnLifecycleTick';
import { OnVariableChanged } from './Events/OnVariableChanged';
import { Branch } from './Flow/Branch';
import { FlipFlop } from './Flow/FlipFlop';
import { ForLoop } from './Flow/ForLoop';
import { Sequence } from './Flow/Sequence';
import { GetVariable } from './Queries/GetVariable';
import { Delay } from './Time/Delay';

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
    'logic/booleanCreate',
    () =>
      new In1Out1FuncNode<boolean, boolean>(
        'logic/booleanCreate',
        'boolean',
        'boolean',
        (a) => a
      )
  );
  nodes.register(
    'logic/floatCreate',
    () =>
      new In1Out1FuncNode<number, number>(
        'logic/floatCreate',
        'float',
        'float',
        (a) => a
      )
  );
  nodes.register(
    'logic/integerCreate',
    () =>
      new In1Out1FuncNode<bigint, bigint>(
        'logic/integerCreate',
        'integer',
        'integer',
        (a) => a
      )
  );
  nodes.register(
    'logic/stringCreate',
    () =>
      new In1Out1FuncNode<string, string>(
        'logic/stringCreate',
        'string',
        'string',
        (a) => a
      )
  );

  // logic: boolean logic

  nodes.register(
    'logic/booleanNot',
    () =>
      new In1Out1FuncNode<boolean, boolean>(
        'logic/booleanNot',
        'boolean',
        'boolean',
        (a) => !a
      )
  );
  nodes.register(
    'logic/booleanOr',
    () =>
      new In2Out1FuncNode<boolean, boolean, boolean>(
        'logic/booleanOr',
        'boolean',
        'boolean',
        'boolean',
        (a, b) => a || b
      )
  );
  nodes.register(
    'logic/booleanAnd',
    () =>
      new In2Out1FuncNode<boolean, boolean, boolean>(
        'logic/booleanAnd',
        'boolean',
        'boolean',
        'boolean',
        (a, b) => a && b
      )
  );

  // logic: arithmetic

  nodes.register(
    'logic/floatAdd',
    () =>
      new In2Out1FuncNode<number, number, number>(
        'logic/floatAdd',
        'float',
        'float',
        'float',
        (a, b) => a + b
      )
  );
  nodes.register(
    'logic/floatSubtract',
    () =>
      new In2Out1FuncNode<number, number, number>(
        'logic/floatSubtract',
        'float',
        'float',
        'float',
        (a, b) => a - b
      )
  );
  nodes.register(
    'logic/floatMultiply',
    () =>
      new In2Out1FuncNode<number, number, number>(
        'logic/floatMultiply',
        'float',
        'float',
        'float',
        (a, b) => a * b
      )
  );
  nodes.register(
    'logic/floatDivide',
    () =>
      new In2Out1FuncNode<number, number, number>(
        'logic/floatDivide',
        'float',
        'float',
        'float',
        (a, b) => a / b
      )
  );
  nodes.register(
    'logic/floatPow',
    () =>
      new In2Out1FuncNode<number, number, number>(
        'logic/floatPow',
        'float',
        'float',
        'float',
        (a, b) => a ** b
      )
  );
  nodes.register(
    'logic/floatNegate',
    () =>
      new In1Out1FuncNode<number, number>(
        'logic/floatNegate',
        'float',
        'float',
        (a) => -a
      )
  );
  nodes.register(
    'logic/floatSqrt',
    () =>
      new In1Out1FuncNode<number, number>(
        'logic/floatSqrt',
        'float',
        'float',
        (a) => Math.sqrt(a)
      )
  );
  nodes.register(
    'logic/floatModulus',
    () =>
      new In2Out1FuncNode<number, number, number>(
        'logic/floatModulus',
        'float',
        'float',
        'float',
        (a, b) => a % b
      )
  );

  nodes.register(
    'logic/integerAdd',
    () =>
      new In2Out1FuncNode<bigint, bigint, bigint>(
        'logic/integerAdd',
        'integer',
        'integer',
        'integer',
        (a, b) => a + b
      )
  );
  nodes.register(
    'logic/integerSubtract',
    () =>
      new In2Out1FuncNode<bigint, bigint, bigint>(
        'logic/integerSubtract',
        'integer',
        'integer',
        'integer',
        (a, b) => a - b
      )
  );
  nodes.register(
    'logic/integerMultiply',
    () =>
      new In2Out1FuncNode<bigint, bigint, bigint>(
        'logic/integerMultiply',
        'integer',
        'integer',
        'integer',
        (a, b) => a * b
      )
  );
  nodes.register(
    'logic/integerDivide',
    () =>
      new In2Out1FuncNode<bigint, bigint, bigint>(
        'logic/integerDivide',
        'integer',
        'integer',
        'integer',
        (a, b) => a / b
      )
  );
  nodes.register(
    'logic/integerNegate',
    () =>
      new In1Out1FuncNode<bigint, bigint>(
        'logic/integerNegate',
        'integer',
        'integer',
        (a) => -a
      )
  );
  nodes.register(
    'logic/integerModulus',
    () =>
      new In2Out1FuncNode<bigint, bigint, bigint>(
        'logic/integerModulus',
        'integer',
        'integer',
        'integer',
        (a, b) => a % b
      )
  );
  nodes.register(
    'logic/integerToFloat',
    () =>
      new In1Out1FuncNode<bigint, number>(
        'logic/integerToFloat',
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
    'logic/floatExp',
    () =>
      new In1Out1FuncNode<number, number>(
        'logic/floatExp',
        'float',
        'float',
        (a) => Math.exp(a)
      )
  );
  nodes.register(
    'logic/floatLog',
    () =>
      new In1Out1FuncNode<number, number>(
        'logic/floatLog',
        'float',
        'float',
        (a) => Math.log(a)
      )
  );
  nodes.register(
    'logic/floatLog2',
    () =>
      new In1Out1FuncNode<number, number>(
        'logic/floatLog2',
        'float',
        'float',
        (a) => Math.log2(a)
      )
  );
  nodes.register(
    'logic/floatLog10',
    () =>
      new In1Out1FuncNode<number, number>(
        'logic/floatLog10',
        'float',
        'float',
        (a) => Math.log10(a)
      )
  );

  // logic: trigonometry

  nodes.register(
    'logic/floatPi',
    () => new In0Out1FuncNode<number>('logic/floatPi', 'float', () => Math.PI)
  );
  nodes.register(
    'logic/floatSin',
    () =>
      new In1Out1FuncNode<number, number>(
        'logic/floatSin',
        'float',
        'float',
        (a) => Math.sin(a)
      )
  );
  nodes.register(
    'logic/floatAsin',
    () =>
      new In1Out1FuncNode<number, number>(
        'logic/floatAsin',
        'float',
        'float',
        (a) => Math.asin(a)
      )
  );
  nodes.register(
    'logic/floatCos',
    () =>
      new In1Out1FuncNode<number, number>(
        'logic/floatCos',
        'float',
        'float',
        (a) => Math.cos(a)
      )
  );
  nodes.register(
    'logic/floatAcos',
    () =>
      new In1Out1FuncNode<number, number>(
        'logic/floatAcos',
        'float',
        'float',
        (a) => Math.acos(a)
      )
  );
  nodes.register(
    'logic/floatTan',
    () =>
      new In1Out1FuncNode<number, number>(
        'logic/floatTan',
        'float',
        'float',
        (a) => Math.tan(a)
      )
  );
  nodes.register(
    'logic/floatAtan',
    () =>
      new In1Out1FuncNode<number, number>(
        'logic/floatAtan',
        'float',
        'float',
        (a) => Math.atan(a)
      )
  );

  // logic: ranges
  nodes.register(
    'logic/integerMin',
    () =>
      new In2Out1FuncNode<bigint, bigint, bigint>(
        'logic/integerMin',
        'integer',
        'integer',
        'integer',
        (a, b) => (a > b ? b : a)
      )
  );
  nodes.register(
    'logic/integerMax',
    () =>
      new In2Out1FuncNode<bigint, bigint, bigint>(
        'logic/integerMax',
        'integer',
        'integer',
        'integer',
        (a, b) => (a > b ? a : b)
      )
  );

  nodes.register(
    'logic/floatMin',
    () =>
      new In2Out1FuncNode<number, number, number>(
        'logic/floatMin',
        'float',
        'float',
        'float',
        (a, b) => Math.min(a, b)
      )
  );
  nodes.register(
    'logic/floatMax',
    () =>
      new In2Out1FuncNode<number, number, number>(
        'logic/floatMax',
        'float',
        'float',
        'float',
        (a, b) => Math.max(a, b)
      )
  );
  nodes.register(
    'logic/floatSign',
    () =>
      new In1Out1FuncNode<number, bigint>(
        'logic/floatSign',
        'float',
        'integer',
        (a) => BigInt(Math.sign(a))
      )
  );
  nodes.register(
    'logic/floatAbs',
    () =>
      new In1Out1FuncNode<number, number>(
        'logic/floatAbs',
        'float',
        'float',
        (a) => Math.abs(a)
      )
  );
  nodes.register(
    'logic/floatFloor',
    () =>
      new In1Out1FuncNode<number, bigint>(
        'logic/floatFloor',
        'float',
        'integer',
        (a) => BigInt(Math.floor(a))
      )
  );
  nodes.register(
    'logic/floatCeil',
    () =>
      new In1Out1FuncNode<number, bigint>(
        'logic/floatCeil',
        'float',
        'integer',
        (a) => BigInt(Math.ceil(a))
      )
  );
  nodes.register(
    'logic/floatRound',
    () =>
      new In1Out1FuncNode<number, bigint>(
        'logic/floatRound',
        'float',
        'integer',
        (a) => BigInt(Math.round(a))
      )
  );
  nodes.register(
    'logic/floatTrunc',
    () =>
      new In1Out1FuncNode<number, bigint>(
        'logic/floatTrunc',
        'float',
        'integer',
        (a) => BigInt(Math.trunc(a))
      )
  );

  // logic: sampling

  nodes.register(
    'logic/floatSample',
    () =>
      new In0Out1FuncNode<number>('logic/floatSample', 'float', () =>
        Math.random()
      )
  );

  // logic: comparison

  nodes.register(
    'logic/floatEqual',
    () =>
      new In2Out1FuncNode<number, number, boolean>(
        'logic/floatEqual',
        'float',
        'float',
        'boolean',
        (a, b) => a === b
      )
  );
  nodes.register(
    'logic/floatGreaterThan',
    () =>
      new In2Out1FuncNode<number, number, boolean>(
        'logic/floatGreaterThan',
        'float',
        'float',
        'boolean',
        (a, b) => a > b
      )
  );
  nodes.register(
    'logic/floatGreaterThaOrEqual',
    () =>
      new In2Out1FuncNode<number, number, boolean>(
        'logic/floatGreaterThaOrEqual',
        'float',
        'float',
        'boolean',
        (a, b) => a >= b
      )
  );
  nodes.register(
    'logic/floatLessThan',
    () =>
      new In2Out1FuncNode<number, number, boolean>(
        'logic/floatLessThan',
        'float',
        'float',
        'boolean',
        (a, b) => a < b
      )
  );
  nodes.register(
    'logic/floatLessThaOrEqual',
    () =>
      new In2Out1FuncNode<number, number, boolean>(
        'logic/floatLessThaOrEqual',
        'float',
        'float',
        'boolean',
        (a, b) => a <= b
      )
  );

  nodes.register(
    'logic/integerEqual',
    () =>
      new In2Out1FuncNode<bigint, bigint, boolean>(
        'logic/integerEqual',
        'integer',
        'integer',
        'boolean',
        (a, b) => a === b
      )
  );
  nodes.register(
    'logic/integerGreaterThan',
    () =>
      new In2Out1FuncNode<bigint, bigint, boolean>(
        'logic/integerGreaterThan',
        'integer',
        'integer',
        'boolean',
        (a, b) => a > b
      )
  );
  nodes.register(
    'logic/integerGreaterThaOrEqual',
    () =>
      new In2Out1FuncNode<bigint, bigint, boolean>(
        'logic/integerGreaterThaOrEqual',
        'integer',
        'integer',
        'boolean',
        (a, b) => a >= b
      )
  );
  nodes.register(
    'logic/integerLessThan',
    () =>
      new In2Out1FuncNode<bigint, bigint, boolean>(
        'logic/integerLessThan',
        'integer',
        'integer',
        'boolean',
        (a, b) => a < b
      )
  );
  nodes.register(
    'logic/integerLessThaOrEqual',
    () =>
      new In2Out1FuncNode<bigint, bigint, boolean>(
        'logic/integerLessThaOrEqual',
        'integer',
        'integer',
        'boolean',
        (a, b) => a <= b
      )
  );

  nodes.register(
    'logic/floatIsNan',
    () =>
      new In1Out1FuncNode<number, boolean>(
        'logic/floatIsNan',
        'float',
        'boolean',
        (a) => Number.isNaN(a)
      )
  );
  nodes.register(
    'logic/floatIsInf',
    () =>
      new In1Out1FuncNode<number, boolean>(
        'logic/floatIsInf',
        'float',
        'boolean',
        (a) => !Number.isFinite(a) && !Number.isNaN(a)
      )
  );

  // logic: string utilities

  nodes.register(
    'logic/stringConcat',
    () =>
      new In2Out1FuncNode<string, string, string>(
        'logic/stringConcat',
        'string',
        'string',
        'string',
        (a, b) => a.concat(b)
      )
  );
  nodes.register(
    'logic/stringIncludes',
    () =>
      new In2Out1FuncNode<string, string, boolean>(
        'logic/stringIncludes',
        'string',
        'string',
        'boolean',
        (a, b) => a.includes(b)
      )
  );

  // string - number conversion

  nodes.register(
    'logic/floatToString',
    () =>
      new In1Out1FuncNode<number, string>(
        'logic/floatToString',
        'float',
        'string',
        (a) => values.get('float').serialize(a)
      )
  );

  nodes.register(
    'logic/integerToString',
    () =>
      new In1Out1FuncNode<bigint, string>(
        'logic/integerToString',
        'integer',
        'string',
        (a: bigint) => values.get('integer').serialize(a)
      )
  );

  nodes.register(
    'logic/stringToFloat',
    () =>
      new In1Out1FuncNode<string, number>(
        'logic/stringToFloat',
        'string',
        'float',
        (a: string) => values.get('float').deserialize(a)
      )
  );
  nodes.register(
    'logic/stringToInteger',
    () =>
      new In1Out1FuncNode<string, bigint>(
        'logic/stringToInteger',
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
    'variable/setBoolean',
    () => new SetVariable('variable/setBoolean', 'boolean')
  );
  nodes.register(
    'variable/getBoolean',
    () => new GetVariable('variable/getBoolean', 'boolean')
  );
  nodes.register(
    'variable/onBooleanChanged',
    () => new OnVariableChanged('variable/onBooleanChanged', 'boolean')
  );

  nodes.register(
    'variable/setFloat',
    () => new SetVariable('variable/setFloat', 'float')
  );
  nodes.register(
    'variable/getFloat',
    () => new GetVariable('variable/getFloat', 'float')
  );
  nodes.register(
    'variable/onFloatChanged',
    () => new OnVariableChanged('variable/onFloatChanged', 'float')
  );

  nodes.register(
    'variable/setInteger',
    () => new SetVariable('variable/setInteger', 'integer')
  );
  nodes.register(
    'variable/getInteger',
    () => new GetVariable('variable/getInteger', 'integer')
  );
  nodes.register(
    'variable/onIntegerChanged',
    () => new OnVariableChanged('variable/onIntegerChanged', 'integer')
  );

  nodes.register(
    'variable/setString',
    () => new SetVariable('variable/setString', 'string')
  );
  nodes.register(
    'variable/getString',
    () => new GetVariable('variable/getString', 'string')
  );
  nodes.register(
    'variable/onStringChanged',
    () => new OnVariableChanged('variable/onStringChanged', 'string')
  );

  return registry;
}
