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
import UnaryOp from './Logic/UnaryOp';
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

  registry.registerNodeType('logic/booleanConstant', () => new UnaryOp<boolean, boolean>('logic/booleanConstant', 'boolean', 'boolean', (a) => (a)));
  registry.registerNodeType('logic/numberConstant', () => new UnaryOp<number, number>('logic/numberConstant', 'boolean', 'boolean', (a) => (a)));
  registry.registerNodeType('logic/stringConstant', () => new UnaryOp<string, string>('logic/stringConstant', 'boolean', 'boolean', (a) => (a)));

  // logic: boolean logic

  registry.registerNodeType('logic/booleanNot', () => new UnaryOp<boolean, boolean>('logic/booleanNot', 'boolean', 'boolean', (a) => (!a)));
  registry.registerNodeType('logic/booleanOr', () => new BinaryOp<boolean, boolean>('logic/booleanOr', 'boolean', 'boolean', (a, b) => (a || b)));
  registry.registerNodeType('logic/booleanAnd', () => new BinaryOp<boolean, boolean>('logic/booleanAnd', 'boolean', 'boolean', (a, b) => (a && b)));

  // logic: arithmetic

  registry.registerNodeType('logic/numberAdd', () => new BinaryOp<number, number>('logic/numberAdd', 'number', 'number', (a, b) => (a + b)));
  registry.registerNodeType('logic/numberSubtract', () => new BinaryOp<number, number>('logic/numberSubtract', 'number', 'number', (a, b) => (a - b)));
  registry.registerNodeType('logic/numberMultiply', () => new BinaryOp<number, number>('logic/numberMultiply', 'number', 'number', (a, b) => (a * b)));
  registry.registerNodeType('logic/numberDivide', () => new BinaryOp<number, number>('logic/numberDivide', 'number', 'number', (a, b) => (a / b)));
  registry.registerNodeType('logic/numberPow', () => new BinaryOp<number, number>('logic/numberPow', 'number', 'number', (a, b) => (a ** b)));
  registry.registerNodeType('logic/numberNegate', () => new UnaryOp<number, number>('logic/numberNegate', 'number', 'number', (a) => (-a)));
  registry.registerNodeType('logic/numberSqrt', () => new UnaryOp<number, number>('logic/numberSqrt', 'number', 'number', (a) => (Math.sqrt(a))));

  // logic: exponential

  registry.registerNodeType('logic/numberE', () => new NullaryOp<number>('logic/numberSign', 'number', () => (Math.E)));
  registry.registerNodeType('logic/numberExp', () => new UnaryOp<number, number>('logic/numberExp', 'number', 'number', (a) => (Math.exp(a))));
  registry.registerNodeType('logic/numberLog', () => new UnaryOp<number, number>('logic/numberLog', 'number', 'number', (a) => (Math.log(a))));
  registry.registerNodeType('logic/numberLog2', () => new UnaryOp<number, number>('logic/numberLog2', 'number', 'number', (a) => (Math.log2(a))));
  registry.registerNodeType('logic/numberLog10', () => new UnaryOp<number, number>('logic/numberLog10', 'number', 'number', (a) => (Math.log10(a))));

  // logic: trigonometry

  registry.registerNodeType('logic/numberPi', () => new NullaryOp<number>('logic/numberNegate', 'number', () => (Math.PI)));
  registry.registerNodeType('logic/numberSin', () => new UnaryOp<number, number>('logic/numberSin', 'number', 'number', (a) => (Math.sin(a))));
  registry.registerNodeType('logic/numberAsin', () => new UnaryOp<number, number>('logic/numberAsin', 'number', 'number', (a) => (Math.asin(a))));
  registry.registerNodeType('logic/numberCos', () => new UnaryOp<number, number>('logic/numberCos', 'number', 'number', (a) => (Math.cos(a))));
  registry.registerNodeType('logic/numberAcos', () => new UnaryOp<number, number>('logic/numberAcos', 'number', 'number', (a) => (Math.acos(a))));
  registry.registerNodeType('logic/numberTan', () => new UnaryOp<number, number>('logic/numberTan', 'number', 'number', (a) => (Math.tan(a))));
  registry.registerNodeType('logic/numberAtan', () => new UnaryOp<number, number>('logic/numberAtan', 'number', 'number', (a) => (Math.atan(a))));

  // logic: ranges

  registry.registerNodeType('logic/numberMin', () => new BinaryOp<number, number>('logic/numberMin', 'number', 'number', (a, b) => (Math.min(a, b))));
  registry.registerNodeType('logic/numberMax', () => new BinaryOp<number, number>('logic/numberMax', 'number', 'number', (a, b) => (Math.max(a, b))));
  registry.registerNodeType('logic/numberSign', () => new UnaryOp<number, number>('logic/numberSign', 'number', 'number', (a) => (Math.sign(a))));
  registry.registerNodeType('logic/numberAbs', () => new UnaryOp<number, number>('logic/numberAbs', 'number', 'number', (a) => (Math.abs(a))));
  registry.registerNodeType('logic/numberFloor', () => new UnaryOp<number, number>('logic/numberFloor', 'number', 'number', (a) => (Math.floor(a))));
  registry.registerNodeType('logic/numberCeil', () => new UnaryOp<number, number>('logic/numberCeil', 'number', 'number', (a) => (Math.ceil(a))));
  registry.registerNodeType('logic/numberRound', () => new UnaryOp<number, number>('logic/numberCeil', 'number', 'number', (a) => (Math.round(a))));
  registry.registerNodeType('logic/numberTrunc', () => new UnaryOp<number, number>('logic/numberTrunc', 'number', 'number', (a) => (Math.trunc(a))));

  // logic: sampling

  registry.registerNodeType('logic/numberSample', () => new NullaryOp<number>('logic/numberSample', 'number', () => (Math.random())));

  // logic: comparison

  registry.registerNodeType('logic/numberEqual', () => new BinaryOp<number, boolean>('logic/numberEqual', 'number', 'boolean', (a, b) => (a === b)));
  registry.registerNodeType('logic/numberGreaterThan', () => new BinaryOp<number, boolean>('logic/numberGreaterThan', 'number', 'boolean', (a, b) => (a > b)));
  registry.registerNodeType('logic/numberGreaterThaOrEqual', () => new BinaryOp<number, boolean>('logic/numberGreaterThaOrEqual', 'number', 'boolean', (a, b) => (a >= b)));
  registry.registerNodeType('logic/numberLessThan', () => new BinaryOp<number, boolean>('logic/numberLessThan', 'number', 'boolean', (a, b) => (a < b)));
  registry.registerNodeType('logic/numberLessThaOrEqual', () => new BinaryOp<number, boolean>('logic/numberLessThaOrEqual', 'number', 'boolean', (a, b) => (a <= b)));
  registry.registerNodeType('logic/numberIsNan', () => new UnaryOp<number, boolean>('logic/numberIsNan', 'number', 'boolean', (a) => (Number.isNaN(a))));
  registry.registerNodeType('logic/numberIsInf', () => new UnaryOp<number, boolean>('logic/numberIsInf', 'number', 'boolean', (a) => ((!Number.isFinite(a)) && !Number.isNaN(a))));

  // logic: string utilities

  registry.registerNodeType('logic/stringConcat', () => new BinaryOp<string, string>('logic/stringConcat', 'string', 'string', (a, b) => (a.concat(b))));
  registry.registerNodeType('logic/stringIncludes', () => new BinaryOp<string, boolean>('logic/stringIncludes', 'string', 'boolean', (a, b) => (a.includes(b))));
  registry.registerNodeType('logic/numberToString', () => new UnaryOp<number, string>('logic/numberToString', 'number', 'string', (a) => (a.toString())));
  registry.registerNodeType('logic/parseString', () => new UnaryOp<string, number>('logic/parseString', 'string', 'number', (a) => (parseFloat(a))));
  registry.registerNodeType('logic/stringLength', () => new UnaryOp<string, number>('logic/stringLength', 'string', 'number', (a) => (a.length)));

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
