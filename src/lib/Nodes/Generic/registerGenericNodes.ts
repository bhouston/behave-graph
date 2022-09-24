/* eslint-disable max-len */
import BooleanSocket from '../../Sockets/Typed/BooleanSocket';
import NumberSocket from '../../Sockets/Typed/NumberSocket';
import StringSocket from '../../Sockets/Typed/StringSocket';
import NodeTypeRegistry from '../NodeTypeRegistry';
import Log from './Actions/Log';
import SetVariable from './Actions/SetVariable';
import OnLifecycleEnd from './Events/OnLifecycleEnd';
import OnLifecycleStart from './Events/OnLifecycleStart';
import OnLifecycleTick from './Events/OnLifecycleTick';
import OnVariableChanged from './Events/OnVariableChanged';
import Branch from './Flow/Branch';
import FlipFlop from './Flow/FlipFlop';
import ForLoop from './Flow/ForLoop';
import Sequence from './Flow/Sequence';
import BinaryOp from './Logic/BinaryOp';
import NullaryOp from './Logic/NullaryOp';
import UnaryOp from './Logic/UnaryOp';
import GetVariable from './Queries/GetVariable';
import Delay from './Time/Delay';

export default function registerGenericNodes(registry: NodeTypeRegistry) {
  // actions

  registry.register('action/log', () => new Log());

  // events

  registry.register('lifecycle/start', () => new OnLifecycleStart());
  registry.register('lifecycle/end', () => new OnLifecycleEnd());
  registry.register('lifecycle/tick', () => new OnLifecycleTick());

  // flow control

  registry.register('flow/branch', () => new Branch());
  registry.register('flow/flipFlop', () => new FlipFlop());
  registry.register('flow/forLoop', () => new ForLoop());
  registry.register('flow/sequence', () => new Sequence());

  // time

  registry.register('time/delay', () => new Delay());

  // logic: constants

  registry.register('logic/booleanConstant', () => new UnaryOp<boolean, boolean>('logic/booleanConstant', 'boolean', 'boolean', (a) => (a)));
  registry.register('logic/numberConstant', () => new UnaryOp<number, number>('logic/numberConstant', 'number', 'number', (a) => (a)));
  registry.register('logic/stringConstant', () => new UnaryOp<string, string>('logic/stringConstant', 'string', 'string', (a) => (a)));

  // logic: boolean logic

  registry.register('logic/booleanNot', () => new UnaryOp<boolean, boolean>('logic/booleanNot', 'boolean', 'boolean', (a) => (!a)));
  registry.register('logic/booleanOr', () => new BinaryOp<boolean, boolean, boolean>('logic/booleanOr', 'boolean', 'boolean', 'boolean', (a, b) => (a || b)));
  registry.register('logic/booleanAnd', () => new BinaryOp<boolean, boolean, boolean>('logic/booleanAnd', 'boolean', 'boolean', 'boolean', (a, b) => (a && b)));

  // logic: arithmetic

  registry.register('logic/numberAdd', () => new BinaryOp<number, number, number>('logic/numberAdd', 'number', 'number', 'number', (a, b) => (a + b)));
  registry.register('logic/numberSubtract', () => new BinaryOp<number, number, number>('logic/numberSubtract', 'number', 'number', 'number', (a, b) => (a - b)));
  registry.register('logic/numberMultiply', () => new BinaryOp<number, number, number>('logic/numberMultiply', 'number', 'number', 'number', (a, b) => (a * b)));
  registry.register('logic/numberDivide', () => new BinaryOp<number, number, number>('logic/numberDivide', 'number', 'number', 'number', (a, b) => (a / b)));
  registry.register('logic/numberPow', () => new BinaryOp<number, number, number>('logic/numberPow', 'number', 'number', 'number', (a, b) => (a ** b)));
  registry.register('logic/numberNegate', () => new UnaryOp<number, number>('logic/numberNegate', 'number', 'number', (a) => (-a)));
  registry.register('logic/numberSqrt', () => new UnaryOp<number, number>('logic/numberSqrt', 'number', 'number', (a) => (Math.sqrt(a))));

  // logic: exponential

  registry.register('logic/numberE', () => new NullaryOp<number>('logic/numberE', 'number', () => (Math.E)));
  registry.register('logic/numberExp', () => new UnaryOp<number, number>('logic/numberExp', 'number', 'number', (a) => (Math.exp(a))));
  registry.register('logic/numberLog', () => new UnaryOp<number, number>('logic/numberLog', 'number', 'number', (a) => (Math.log(a))));
  registry.register('logic/numberLog2', () => new UnaryOp<number, number>('logic/numberLog2', 'number', 'number', (a) => (Math.log2(a))));
  registry.register('logic/numberLog10', () => new UnaryOp<number, number>('logic/numberLog10', 'number', 'number', (a) => (Math.log10(a))));

  // logic: trigonometry

  registry.register('logic/numberPi', () => new NullaryOp<number>('logic/numberPi', 'number', () => (Math.PI)));
  registry.register('logic/numberSin', () => new UnaryOp<number, number>('logic/numberSin', 'number', 'number', (a) => (Math.sin(a))));
  registry.register('logic/numberAsin', () => new UnaryOp<number, number>('logic/numberAsin', 'number', 'number', (a) => (Math.asin(a))));
  registry.register('logic/numberCos', () => new UnaryOp<number, number>('logic/numberCos', 'number', 'number', (a) => (Math.cos(a))));
  registry.register('logic/numberAcos', () => new UnaryOp<number, number>('logic/numberAcos', 'number', 'number', (a) => (Math.acos(a))));
  registry.register('logic/numberTan', () => new UnaryOp<number, number>('logic/numberTan', 'number', 'number', (a) => (Math.tan(a))));
  registry.register('logic/numberAtan', () => new UnaryOp<number, number>('logic/numberAtan', 'number', 'number', (a) => (Math.atan(a))));

  // logic: ranges

  registry.register('logic/numberMin', () => new BinaryOp<number, number, number>('logic/numberMin', 'number', 'number', 'number', (a, b) => (Math.min(a, b))));
  registry.register('logic/numberMax', () => new BinaryOp<number, number, number>('logic/numberMax', 'number', 'number', 'number', (a, b) => (Math.max(a, b))));
  registry.register('logic/numberSign', () => new UnaryOp<number, number>('logic/numberSign', 'number', 'number', (a) => (Math.sign(a))));
  registry.register('logic/numberAbs', () => new UnaryOp<number, number>('logic/numberAbs', 'number', 'number', (a) => (Math.abs(a))));
  registry.register('logic/numberFloor', () => new UnaryOp<number, number>('logic/numberFloor', 'number', 'number', (a) => (Math.floor(a))));
  registry.register('logic/numberCeil', () => new UnaryOp<number, number>('logic/numberCeil', 'number', 'number', (a) => (Math.ceil(a))));
  registry.register('logic/numberRound', () => new UnaryOp<number, number>('logic/numberRound', 'number', 'number', (a) => (Math.round(a))));
  registry.register('logic/numberTrunc', () => new UnaryOp<number, number>('logic/numberTrunc', 'number', 'number', (a) => (Math.trunc(a))));

  // logic: sampling

  registry.register('logic/numberSample', () => new NullaryOp<number>('logic/numberSample', 'number', () => (Math.random())));

  // logic: comparison

  registry.register('logic/numberEqual', () => new BinaryOp<number, number, boolean>('logic/numberEqual', 'number', 'number', 'boolean', (a, b) => (a === b)));
  registry.register('logic/numberGreaterThan', () => new BinaryOp<number, number, boolean>('logic/numberGreaterThan', 'number', 'number', 'boolean', (a, b) => (a > b)));
  registry.register('logic/numberGreaterThaOrEqual', () => new BinaryOp<number, number, boolean>('logic/numberGreaterThaOrEqual', 'number', 'number', 'boolean', (a, b) => (a >= b)));
  registry.register('logic/numberLessThan', () => new BinaryOp<number, number, boolean>('logic/numberLessThan', 'number', 'number', 'boolean', (a, b) => (a < b)));
  registry.register('logic/numberLessThaOrEqual', () => new BinaryOp<number, number, boolean>('logic/numberLessThaOrEqual', 'number', 'number', 'boolean', (a, b) => (a <= b)));
  registry.register('logic/numberIsNan', () => new UnaryOp<number, boolean>('logic/numberIsNan', 'number', 'boolean', (a) => (Number.isNaN(a))));
  registry.register('logic/numberIsInf', () => new UnaryOp<number, boolean>('logic/numberIsInf', 'number', 'boolean', (a) => ((!Number.isFinite(a)) && !Number.isNaN(a))));

  // logic: string utilities

  registry.register('logic/stringConcat', () => new BinaryOp<string, string, string>('logic/stringConcat', 'string', 'string', 'string', (a, b) => (a.concat(b))));
  registry.register('logic/stringIncludes', () => new BinaryOp<string, string, boolean>('logic/stringIncludes', 'string', 'string', 'boolean', (a, b) => (a.includes(b))));
  registry.register('logic/numberToString', () => new UnaryOp<number, string>('logic/numberToString', 'number', 'string', (a) => (a.toString())));
  registry.register('logic/parseString', () => new UnaryOp<string, number>('logic/parseString', 'string', 'number', (a) => (parseFloat(a))));
  registry.register('logic/stringLength', () => new UnaryOp<string, number>('logic/stringLength', 'string', 'number', (a) => (a.length)));

  // state

  registry.register('variable/setBoolean', () => new SetVariable('variable/setBoolean', 'boolean', (socketName) => new BooleanSocket(socketName)));
  registry.register('variable/getBoolean', () => new GetVariable('variable/getBoolean', 'boolean', (socketName) => new BooleanSocket(socketName)));
  registry.register('variable/onBooleanChanged', () => new OnVariableChanged('variable/onBooleanChanged', 'boolean', (socketName) => new BooleanSocket(socketName)));

  registry.register('variable/setNumber', () => new SetVariable('variable/setNumber', 'number', (socketName) => new NumberSocket(socketName)));
  registry.register('variable/getNumber', () => new GetVariable('variable/getNumber', 'number', (socketName) => new NumberSocket(socketName)));
  registry.register('variable/onNumberChanged', () => new OnVariableChanged('variable/onNumberChanged', 'number', (socketName) => new NumberSocket(socketName)));

  registry.register('variable/setString', () => new SetVariable('variable/setString', 'string', (socketName) => new StringSocket(socketName)));
  registry.register('variable/getString', () => new GetVariable('variable/getString', 'string', (socketName) => new StringSocket(socketName)));
  registry.register('variable/onStringChanged', () => new OnVariableChanged('variable/onStringChanged', 'string', (socketName) => new StringSocket(socketName)));

  return registry;
}
