import GraphTypeRegistry from '../../Graphs/GraphTypeRegistry';
import BooleanSocket from '../../Sockets/Typed/BooleanSocket';
import NumberSocket from '../../Sockets/Typed/NumberSocket';
import StringSocket from '../../Sockets/Typed/StringSocket';
import Log from './Actions/Log';
import Start from './Events/Start';
import Tick from './Events/Tick';
import Branch from './Flow/Branch';
import FlipFlop from './Flow/FlipFlop';
import ForLoop from './Flow/ForLoop';
import Sequence from './Flow/Sequence';
import BinaryOp from './Logic/BinaryOp';
import NullaryOp from './Logic/NullaryOp';
import UniaryOp from './Logic/UniaryOp';
import StateExists from './State/StateExists';
import StateGet from './State/StateGet';
import StateSet from './State/StateSet';
import Delay from './Time/Delay';

export default function registerGenericNodes(registry: GraphTypeRegistry) {
  // actions

  registry.registerNodeType('action/log', () => new Log());

  // events

  registry.registerNodeType('event/start', () => new Start());
  registry.registerNodeType('event/tick', () => new Tick());

  // flow control

  registry.registerNodeType('flow/branch', () => new Branch());
  registry.registerNodeType('flow/flipFlop', () => new FlipFlop());
  registry.registerNodeType('flow/forLoop', () => new ForLoop());
  registry.registerNodeType('flow/sequence', () => new Sequence());

  // time

  registry.registerNodeType('time/delay', () => new Delay());

  // logic: constants

  registry.registerNodeType('logic/booleanConstant', () => new UniaryOp<boolean, boolean>('logic/booleanConstant', (a) => (a)));
  registry.registerNodeType('logic/numberConstant', () => new UniaryOp<number, number>('logic/numberConstant', (a) => (a)));
  registry.registerNodeType('logic/stringConstant', () => new UniaryOp<string, string>('logic/stringConstant', (a) => (a)));

  // logic: boolean logic

  registry.registerNodeType('logic/booleanNot', () => new UniaryOp<boolean, boolean>('logic/booleanNot', (a) => (!a)));
  registry.registerNodeType('logic/booleanOr', () => new BinaryOp<boolean, boolean>('logic/booleanOr', (a, b) => (a || b)));
  registry.registerNodeType('logic/booleanAnd', () => new BinaryOp<boolean, boolean>('logic/booleanAnd', (a, b) => (a && b)));

  // logic: arithmetic

  registry.registerNodeType('logic/numberAdd', () => new BinaryOp<number, number>('logic/numberAdd', (a, b) => (a + b)));
  registry.registerNodeType('logic/numberSubtract', () => new BinaryOp<number, number>('logic/numberSubtract', (a, b) => (a - b)));
  registry.registerNodeType('logic/numberMultiply', () => new BinaryOp<number, number>('logic/numberMultiply', (a, b) => (a * b)));
  registry.registerNodeType('logic/numberDivide', () => new BinaryOp<number, number>('logic/numberDivide', (a, b) => (a / b)));
  registry.registerNodeType('logic/numberPow', () => new BinaryOp<number, number>('logic/numberPow', (a, b) => (a ** b)));
  registry.registerNodeType('logic/numberNegate', () => new UniaryOp<number, number>('logic/numberNegate', (a) => (-a)));
  registry.registerNodeType('logic/numberSqrt', () => new UniaryOp<number, number>('logic/numberSqrt', (a) => (Math.sqrt(a))));

  // logic: exponential

  registry.registerNodeType('logic/numberE', () => new NullaryOp<number>('logic/numberSign', () => (Math.E)));
  registry.registerNodeType('logic/numberExp', () => new UniaryOp<number, number>('logic/numberExp', (a) => (Math.exp(a))));
  registry.registerNodeType('logic/numberLog', () => new UniaryOp<number, number>('logic/numberLog', (a) => (Math.log(a))));
  registry.registerNodeType('logic/numberLog2', () => new UniaryOp<number, number>('logic/numberLog2', (a) => (Math.log2(a))));
  registry.registerNodeType('logic/numberLog10', () => new UniaryOp<number, number>('logic/numberLog10', (a) => (Math.log10(a))));

  // logic: trigonometry

  registry.registerNodeType('logic/numberPi', () => new NullaryOp<number>('logic/numberNegate', () => (Math.PI)));
  registry.registerNodeType('logic/numberSin', () => new UniaryOp<number, number>('logic/numberSin', (a) => (Math.sin(a))));
  registry.registerNodeType('logic/numberAsin', () => new UniaryOp<number, number>('logic/numberSin', (a) => (Math.asin(a))));
  registry.registerNodeType('logic/numberCos', () => new UniaryOp<number, number>('logic/numberCos', (a) => (Math.cos(a))));
  registry.registerNodeType('logic/numberAcos', () => new UniaryOp<number, number>('logic/numberCos', (a) => (Math.acos(a))));
  registry.registerNodeType('logic/numberTan', () => new UniaryOp<number, number>('logic/numberTan', (a) => (Math.tan(a))));
  registry.registerNodeType('logic/numberAtan', () => new UniaryOp<number, number>('logic/numberTan', (a) => (Math.atan(a))));

  // logic: ranges

  registry.registerNodeType('logic/numberMin', () => new BinaryOp<number, number>('logic/numberMin', (a, b) => (Math.min(a, b))));
  registry.registerNodeType('logic/numberMax', () => new BinaryOp<number, number>('logic/numberMax', (a, b) => (Math.max(a, b))));
  registry.registerNodeType('logic/numberSign', () => new UniaryOp<number, number>('logic/numberSign', (a) => (Math.sign(a))));
  registry.registerNodeType('logic/numberAbs', () => new UniaryOp<number, number>('logic/numberAbs', (a) => (Math.abs(a))));
  registry.registerNodeType('logic/numberFloor', () => new UniaryOp<number, number>('logic/numberFloor', (a) => (Math.floor(a))));
  registry.registerNodeType('logic/numberCeil', () => new UniaryOp<number, number>('logic/numberCeil', (a) => (Math.ceil(a))));
  registry.registerNodeType('logic/numberRound', () => new UniaryOp<number, number>('logic/numberCeil', (a) => (Math.round(a))));
  registry.registerNodeType('logic/numberTrunc', () => new UniaryOp<number, number>('logic/numberTrunc', (a) => (Math.trunc(a))));

  // logic: sampling

  registry.registerNodeType('logic/numberSample', () => new NullaryOp<number>('logic/numberSample', () => (Math.random())));

  // logic: comparison

  registry.registerNodeType('logic/numberEqual', () => new BinaryOp<number, boolean>('logic/numberEqual', (a, b) => (a === b)));
  registry.registerNodeType('logic/numberGreaterThan', () => new BinaryOp<number, boolean>('logic/numberGreaterThan', (a, b) => (a > b)));
  registry.registerNodeType('logic/numberGreaterThaOrEqual', () => new BinaryOp<number, boolean>('logic/numberGreaterThaOrEqual', (a, b) => (a >= b)));
  registry.registerNodeType('logic/numberLessThan', () => new BinaryOp<number, boolean>('logic/numberLessThan', (a, b) => (a < b)));
  registry.registerNodeType('logic/numberLessThaOrEqual', () => new BinaryOp<number, boolean>('logic/numberLessThaOrEqual', (a, b) => (a <= b)));
  registry.registerNodeType('logic/numberIsNan', () => new UniaryOp<number, boolean>('logic/numberIsNan', (a) => (Number.isNaN(a))));
  registry.registerNodeType('logic/numberIsInf', () => new UniaryOp<number, boolean>('logic/numberIsInf', (a) => ((!Number.isFinite(a)) && !Number.isNaN(a))));

  // logic: string utilities

  registry.registerNodeType('logic/stringConcat', () => new BinaryOp<string, string>('logic/stringConcat', (a, b) => (a.concat(b))));
  registry.registerNodeType('logic/stringIncludes', () => new BinaryOp<string, boolean>('logic/stringIncludes', (a, b) => (a.includes(b))));
  registry.registerNodeType('logic/numberToString', () => new UniaryOp<number, string>('logic/numberToString', (a) => (a.toString())));
  registry.registerNodeType('logic/stringLength', () => new UniaryOp<string, number>('logic/stringLength', (a) => (a.length)));

  // state

  registry.registerNodeType('state/exists', () => new StateExists());

  registry.registerNodeType('state/setBoolean', () => new StateSet('state/setBoolean', (socketName) => new BooleanSocket(socketName)));
  registry.registerNodeType('state/getBoolean', () => new StateGet('state/getBoolean', (socketName) => new BooleanSocket(socketName)));

  registry.registerNodeType('state/setNumber', () => new StateSet('state/setNumber', (socketName) => new NumberSocket(socketName)));
  registry.registerNodeType('state/getNumber', () => new StateGet('state/getNumber', (socketName) => new NumberSocket(socketName)));

  registry.registerNodeType('state/setString', () => new StateSet('state/setString', (socketName) => new StringSocket(socketName)));
  registry.registerNodeType('state/getString', () => new StateGet('state/getString', (socketName) => new StringSocket(socketName)));

  return registry;
}
