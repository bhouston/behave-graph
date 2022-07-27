import { DebugOutput } from './Actions/DebugOutput';
import { SetNodeBoolean } from './Actions/SetNodeBoolean';
import { SetNodeVector3 } from './Actions/SetNodeVector3';
import { NodeClick } from './Events/NodeClick';
import { SceneStart } from './Events/SceneStart';
import { Tick } from './Events/Tick';
import { Branch } from './FlowControl/Branch';
import { Delay } from './FlowControl/Delay';
import { ForLoop } from './FlowControl/ForLoop';
import { Sequence } from './FlowControl/Sequence';
import { BinaryOp } from './Logic/BinaryOp';
import NullaryOp from './Logic/NullaryOp';
import UniaryOp from './Logic/UniaryOp';
import { NodeRegistry } from './NodeRegistry';
import GetNodeBoolean from './Queries/GetNodeBoolean';
import GetNodeVector3 from './Queries/GetNodeVector3';

export default function registryDefaultNodes(nodeRegistry: NodeRegistry) {
  // actions

  nodeRegistry.add('action/debugOutput', () => new DebugOutput());
  nodeRegistry.add('action/setNodeVisible', () => new SetNodeBoolean('action/setNodeVisible', 'visibility'));
  nodeRegistry.add('action/setNodeRotation', () => new SetNodeVector3('action/setNodeRotation', 'rotation'));
  nodeRegistry.add('action/setNodeTranslation', () => new SetNodeVector3('action/setNodeTranslation', 'translation'));
  nodeRegistry.add('action/setNodeScale', () => new SetNodeVector3('action/setNodeScale', 'scale'));

  // events

  nodeRegistry.add('event/nodeClick', () => new NodeClick());
  nodeRegistry.add('event/sceneStart', () => new SceneStart());
  nodeRegistry.add('event/tick', () => new Tick());

  // flow control

  nodeRegistry.add('flowcontrol/branch', () => new Branch());
  nodeRegistry.add('flowcontrol/delay', () => new Delay());
  nodeRegistry.add('flowcontrol/forloop', () => new ForLoop());
  nodeRegistry.add('flowcontrol/sequence', () => new Sequence());

  // queries

  nodeRegistry.add('query/getNodeRotation', () => new GetNodeVector3('logic/getNodeRotation', 'rotation'));
  nodeRegistry.add('query/getNodeTranslation', () => new GetNodeVector3('logic/getNodeTranslation', 'translation'));
  nodeRegistry.add('query/getNodeScale', () => new GetNodeVector3('logic/getNodeScale', 'scale'));
  nodeRegistry.add('query/getNodeVisibility', () => new GetNodeBoolean('logic/getNodeVisibility', 'visibility'));

  // logic: arithmetic

  nodeRegistry.add('logic/numberAdd', () => new BinaryOp<number, number>('logic/numberAdd', (a, b) => (a + b)));
  nodeRegistry.add('logic/numberSubtract', () => new BinaryOp<number, number>('logic/numberSubtract', (a, b) => (a - b)));
  nodeRegistry.add('logic/numberMultiply', () => new BinaryOp<number, number>('logic/numberMultiply', (a, b) => (a * b)));
  nodeRegistry.add('logic/numberDivide', () => new BinaryOp<number, number>('logic/numberDivide', (a, b) => (a / b)));
  nodeRegistry.add('logic/numberPow', () => new BinaryOp<number, number>('logic/numberPow', (a, b) => (a ** b)));
  nodeRegistry.add('logic/numberNegate', () => new UniaryOp<number, number>('logic/numberNegate', (a) => (-a)));
  nodeRegistry.add('logic/numberSqrt', () => new UniaryOp<number, number>('logic/numberSqrt', (a) => (Math.sqrt(a))));

  // logic: exponential

  nodeRegistry.add('logic/numberE', () => new NullaryOp<number>('logic/numberSign', () => (Math.E)));
  nodeRegistry.add('logic/numberExp', () => new UniaryOp<number, number>('logic/numberExp', (a) => (Math.exp(a))));
  nodeRegistry.add('logic/numberLog', () => new UniaryOp<number, number>('logic/numberLog', (a) => (Math.log(a))));
  nodeRegistry.add('logic/numberLog2', () => new UniaryOp<number, number>('logic/numberLog2', (a) => (Math.log2(a))));
  nodeRegistry.add('logic/numberLog10', () => new UniaryOp<number, number>('logic/numberLog10', (a) => (Math.log10(a))));

  // logic: trigonometry

  nodeRegistry.add('logic/numberPi', () => new NullaryOp<number>('logic/numberNegate', () => (Math.PI)));
  nodeRegistry.add('logic/numberSin', () => new UniaryOp<number, number>('logic/numberSin', (a) => (Math.sin(a))));
  nodeRegistry.add('logic/numberAsin', () => new UniaryOp<number, number>('logic/numberSin', (a) => (Math.asin(a))));
  nodeRegistry.add('logic/numberCos', () => new UniaryOp<number, number>('logic/numberCos', (a) => (Math.cos(a))));
  nodeRegistry.add('logic/numberAcos', () => new UniaryOp<number, number>('logic/numberCos', (a) => (Math.acos(a))));
  nodeRegistry.add('logic/numberTan', () => new UniaryOp<number, number>('logic/numberTan', (a) => (Math.tan(a))));
  nodeRegistry.add('logic/numberAtan', () => new UniaryOp<number, number>('logic/numberTan', (a) => (Math.atan(a))));

  // logic: ranges

  nodeRegistry.add('logic/numberMax', () => new BinaryOp<number, number>('logic/numberMax', (a, b) => (Math.max(a, b))));
  nodeRegistry.add('logic/numberMin', () => new BinaryOp<number, number>('logic/numberMin', (a, b) => (Math.min(a, b))));
  nodeRegistry.add('logic/numberSign', () => new UniaryOp<number, number>('logic/numberSign', (a) => (Math.sign(a))));
  nodeRegistry.add('logic/numberAbs', () => new UniaryOp<number, number>('logic/numberAbs', (a) => (Math.abs(a))));
  nodeRegistry.add('logic/numberFloor', () => new UniaryOp<number, number>('logic/numberFloor', (a) => (Math.floor(a))));
  nodeRegistry.add('logic/numberCeil', () => new UniaryOp<number, number>('logic/numberCeil', (a) => (Math.ceil(a))));
  nodeRegistry.add('logic/numberRound', () => new UniaryOp<number, number>('logic/numberCeil', (a) => (Math.round(a))));
  nodeRegistry.add('logic/numberTrunc', () => new UniaryOp<number, number>('logic/numberTrunc', (a) => (Math.trunc(a))));

  // logic: sampling

  nodeRegistry.add('logic/numberSample', () => new UniaryOp<number, number>('logic/numberSample', (a) => (Math.random())));

  // logic: boolean logic

  nodeRegistry.add('logic/booleanNot', () => new UniaryOp<boolean, boolean>('logic/booleanNot', (a) => (!a)));
  nodeRegistry.add('logic/booleanAnd', () => new BinaryOp<boolean, boolean>('logic/booleanAnd', (a, b) => (a && b)));
  nodeRegistry.add('logic/booleanOr', () => new BinaryOp<boolean, boolean>('logic/booleanOr', (a, b) => (a || b)));

  // logic: comparison

  nodeRegistry.add('logic/numberEqual', () => new BinaryOp<number, boolean>('logic/numberEqual', (a, b) => (a === b)));
  nodeRegistry.add('logic/numberGreaterThan', () => new BinaryOp<number, boolean>('logic/numberGreaterThan', (a, b) => (a > b)));
  nodeRegistry.add('logic/numberGreaterThaOrEqual', () => new BinaryOp<number, boolean>('logic/numberGreaterThaOrEqual', (a, b) => (a >= b)));
  nodeRegistry.add('logic/numberLessThan', () => new BinaryOp<number, boolean>('logic/numberLessThan', (a, b) => (a < b)));
  nodeRegistry.add('logic/numberLessThaOrEqual', () => new BinaryOp<number, boolean>('logic/numberLessThaOrEqual', (a, b) => (a <= b)));
  nodeRegistry.add('logic/numberIsNan', () => new UniaryOp<number, boolean>('logic/numberIsNan', (a) => (Number.isNaN(a))));
  nodeRegistry.add('logic/numberIsInf', () => new UniaryOp<number, boolean>('logic/numberIsInf', (a) => ((!Number.isFinite(a)) && !Number.isNaN(a))));

  // logic: string utilities

  nodeRegistry.add('logic/stringConcat', () => new BinaryOp<string, string>('logic/stringConcat', (a, b) => (a.concat(b))));
  nodeRegistry.add('logic/stringIncludes', () => new BinaryOp<string, boolean>('logic/stringIncludes', (a, b) => (a.includes(b))));
  nodeRegistry.add('logic/numberToString', () => new UniaryOp<number, string>('logic/numberToString', (a) => (a.toString())));
  nodeRegistry.add('logic/stringLength', () => new UniaryOp<string, number>('logic/stringLength', (a) => (a.length)));

  return nodeRegistry;
}
