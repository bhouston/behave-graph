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
  const { nodes } = registry;

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
    'logic/booleanConstant',
    () =>
      new In1Out1FuncNode<boolean, boolean>(
        'logic/booleanConstant',
        'boolean',
        'boolean',
        (a) => a
      )
  );
  nodes.register(
    'logic/numberCreate',
    () =>
      new In1Out1FuncNode<number, number>(
        'logic/numberCreate',
        'number',
        'number',
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
    'logic/numberAdd',
    () =>
      new In2Out1FuncNode<number, number, number>(
        'logic/numberAdd',
        'number',
        'number',
        'number',
        (a, b) => a + b
      )
  );
  nodes.register(
    'logic/numberSubtract',
    () =>
      new In2Out1FuncNode<number, number, number>(
        'logic/numberSubtract',
        'number',
        'number',
        'number',
        (a, b) => a - b
      )
  );
  nodes.register(
    'logic/numberMultiply',
    () =>
      new In2Out1FuncNode<number, number, number>(
        'logic/numberMultiply',
        'number',
        'number',
        'number',
        (a, b) => a * b
      )
  );
  nodes.register(
    'logic/numberDivide',
    () =>
      new In2Out1FuncNode<number, number, number>(
        'logic/numberDivide',
        'number',
        'number',
        'number',
        (a, b) => a / b
      )
  );
  nodes.register(
    'logic/numberPow',
    () =>
      new In2Out1FuncNode<number, number, number>(
        'logic/numberPow',
        'number',
        'number',
        'number',
        (a, b) => a ** b
      )
  );
  nodes.register(
    'logic/numberNegate',
    () =>
      new In1Out1FuncNode<number, number>(
        'logic/numberNegate',
        'number',
        'number',
        (a) => -a
      )
  );
  nodes.register(
    'logic/numberSqrt',
    () =>
      new In1Out1FuncNode<number, number>(
        'logic/numberSqrt',
        'number',
        'number',
        (a) => Math.sqrt(a)
      )
  );
  nodes.register(
    'logic/numberModulus',
    () =>
      new In2Out1FuncNode<number, number, number>(
        'logic/numberModulus',
        'number',
        'number',
        'number',
        (a, b) => a % b
      )
  );

  // logic: exponential

  nodes.register(
    'logic/numberE',
    () => new In0Out1FuncNode<number>('logic/numberE', 'number', () => Math.E)
  );
  nodes.register(
    'logic/numberExp',
    () =>
      new In1Out1FuncNode<number, number>(
        'logic/numberExp',
        'number',
        'number',
        (a) => Math.exp(a)
      )
  );
  nodes.register(
    'logic/numberLog',
    () =>
      new In1Out1FuncNode<number, number>(
        'logic/numberLog',
        'number',
        'number',
        (a) => Math.log(a)
      )
  );
  nodes.register(
    'logic/numberLog2',
    () =>
      new In1Out1FuncNode<number, number>(
        'logic/numberLog2',
        'number',
        'number',
        (a) => Math.log2(a)
      )
  );
  nodes.register(
    'logic/numberLog10',
    () =>
      new In1Out1FuncNode<number, number>(
        'logic/numberLog10',
        'number',
        'number',
        (a) => Math.log10(a)
      )
  );

  // logic: trigonometry

  nodes.register(
    'logic/numberPi',
    () => new In0Out1FuncNode<number>('logic/numberPi', 'number', () => Math.PI)
  );
  nodes.register(
    'logic/numberSin',
    () =>
      new In1Out1FuncNode<number, number>(
        'logic/numberSin',
        'number',
        'number',
        (a) => Math.sin(a)
      )
  );
  nodes.register(
    'logic/numberAsin',
    () =>
      new In1Out1FuncNode<number, number>(
        'logic/numberAsin',
        'number',
        'number',
        (a) => Math.asin(a)
      )
  );
  nodes.register(
    'logic/numberCos',
    () =>
      new In1Out1FuncNode<number, number>(
        'logic/numberCos',
        'number',
        'number',
        (a) => Math.cos(a)
      )
  );
  nodes.register(
    'logic/numberAcos',
    () =>
      new In1Out1FuncNode<number, number>(
        'logic/numberAcos',
        'number',
        'number',
        (a) => Math.acos(a)
      )
  );
  nodes.register(
    'logic/numberTan',
    () =>
      new In1Out1FuncNode<number, number>(
        'logic/numberTan',
        'number',
        'number',
        (a) => Math.tan(a)
      )
  );
  nodes.register(
    'logic/numberAtan',
    () =>
      new In1Out1FuncNode<number, number>(
        'logic/numberAtan',
        'number',
        'number',
        (a) => Math.atan(a)
      )
  );

  // logic: ranges

  nodes.register(
    'logic/numberMin',
    () =>
      new In2Out1FuncNode<number, number, number>(
        'logic/numberMin',
        'number',
        'number',
        'number',
        (a, b) => Math.min(a, b)
      )
  );
  nodes.register(
    'logic/numberMax',
    () =>
      new In2Out1FuncNode<number, number, number>(
        'logic/numberMax',
        'number',
        'number',
        'number',
        (a, b) => Math.max(a, b)
      )
  );
  nodes.register(
    'logic/numberSign',
    () =>
      new In1Out1FuncNode<number, number>(
        'logic/numberSign',
        'number',
        'number',
        (a) => Math.sign(a)
      )
  );
  nodes.register(
    'logic/numberAbs',
    () =>
      new In1Out1FuncNode<number, number>(
        'logic/numberAbs',
        'number',
        'number',
        (a) => Math.abs(a)
      )
  );
  nodes.register(
    'logic/numberFloor',
    () =>
      new In1Out1FuncNode<number, number>(
        'logic/numberFloor',
        'number',
        'number',
        (a) => Math.floor(a)
      )
  );
  nodes.register(
    'logic/numberCeil',
    () =>
      new In1Out1FuncNode<number, number>(
        'logic/numberCeil',
        'number',
        'number',
        (a) => Math.ceil(a)
      )
  );
  nodes.register(
    'logic/numberRound',
    () =>
      new In1Out1FuncNode<number, number>(
        'logic/numberRound',
        'number',
        'number',
        (a) => Math.round(a)
      )
  );
  nodes.register(
    'logic/numberTrunc',
    () =>
      new In1Out1FuncNode<number, number>(
        'logic/numberTrunc',
        'number',
        'number',
        (a) => Math.trunc(a)
      )
  );

  // logic: sampling

  nodes.register(
    'logic/numberSample',
    () =>
      new In0Out1FuncNode<number>('logic/numberSample', 'number', () =>
        Math.random()
      )
  );

  // logic: comparison

  nodes.register(
    'logic/numberEqual',
    () =>
      new In2Out1FuncNode<number, number, boolean>(
        'logic/numberEqual',
        'number',
        'number',
        'boolean',
        (a, b) => a === b
      )
  );
  nodes.register(
    'logic/numberGreaterThan',
    () =>
      new In2Out1FuncNode<number, number, boolean>(
        'logic/numberGreaterThan',
        'number',
        'number',
        'boolean',
        (a, b) => a > b
      )
  );
  nodes.register(
    'logic/numberGreaterThaOrEqual',
    () =>
      new In2Out1FuncNode<number, number, boolean>(
        'logic/numberGreaterThaOrEqual',
        'number',
        'number',
        'boolean',
        (a, b) => a >= b
      )
  );
  nodes.register(
    'logic/numberLessThan',
    () =>
      new In2Out1FuncNode<number, number, boolean>(
        'logic/numberLessThan',
        'number',
        'number',
        'boolean',
        (a, b) => a < b
      )
  );
  nodes.register(
    'logic/numberLessThaOrEqual',
    () =>
      new In2Out1FuncNode<number, number, boolean>(
        'logic/numberLessThaOrEqual',
        'number',
        'number',
        'boolean',
        (a, b) => a <= b
      )
  );
  nodes.register(
    'logic/numberIsNan',
    () =>
      new In1Out1FuncNode<number, boolean>(
        'logic/numberIsNan',
        'number',
        'boolean',
        (a) => Number.isNaN(a)
      )
  );
  nodes.register(
    'logic/numberIsInf',
    () =>
      new In1Out1FuncNode<number, boolean>(
        'logic/numberIsInf',
        'number',
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
  nodes.register(
    'logic/numberToString',
    () =>
      new In1Out1FuncNode<number, string>(
        'logic/numberToString',
        'number',
        'string',
        (a) => a.toString()
      )
  );
  nodes.register(
    'logic/parseString',
    () =>
      new In1Out1FuncNode<string, number>(
        'logic/parseString',
        'string',
        'number',
        (a) => Number.parseFloat(a)
      )
  );
  nodes.register(
    'logic/stringLength',
    () =>
      new In1Out1FuncNode<string, number>(
        'logic/stringLength',
        'string',
        'number',
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
    'variable/setNumber',
    () => new SetVariable('variable/setNumber', 'number')
  );
  nodes.register(
    'variable/getNumber',
    () => new GetVariable('variable/getNumber', 'number')
  );
  nodes.register(
    'variable/onNumberChanged',
    () => new OnVariableChanged('variable/onNumberChanged', 'number')
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
