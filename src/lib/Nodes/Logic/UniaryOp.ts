import NumberSocket from './Sockets/Spec/NumberSocket';
import Node from '../../../Nodes/Node';
import NodeEvalContext from '../NodeEvalContext';
import { GlobalNodeRegistry } from '../GlobalNodeRegistry';

export type UniaryOpFunc<Input, Output> = (a: Input) => Output;

export class UniaryOp<Input, Output> extends Node {
  constructor(nodeName: string, public uniaryOpFunc: UniaryOpFunc<Input, Output>) {
    super(
      nodeName,
      [
        new NumberSocket('a'),
        new NumberSocket('b'),
      ],
      [new NumberSocket('result')],
      (context: NodeEvalContext, inputValues: Map<string, any>) => {
        const outputValues = new Map<string, any>();
        outputValues.set('result', this.uniaryOpFunc(inputValues.get('a')));
        return outputValues;
      },
    );
  }
}

// arithmetic
GlobalNodeRegistry.add('logic/numberNegate', () => new UniaryOp<number, number>('logic/numberNegate', (a) => (-a)));
GlobalNodeRegistry.add('logic/numberSqrt', () => new UniaryOp<number, number>('logic/numberSqrt', (a) => (Math.sqrt(a))));

// exponential
GlobalNodeRegistry.add('logic/numberExp', () => new UniaryOp<number, number>('logic/numberExp', (a) => (Math.exp(a))));
GlobalNodeRegistry.add('logic/numberLog', () => new UniaryOp<number, number>('logic/numberLog', (a) => (Math.log(a))));
GlobalNodeRegistry.add('logic/numberLog2', () => new UniaryOp<number, number>('logic/numberLog2', (a) => (Math.log2(a))));
GlobalNodeRegistry.add('logic/numberLog10', () => new UniaryOp<number, number>('logic/numberLog10', (a) => (Math.log10(a))));

// trigonometry
GlobalNodeRegistry.add('logic/numberSin', () => new UniaryOp<number, number>('logic/numberSin', (a) => (Math.sin(a))));
GlobalNodeRegistry.add('logic/numberAsin', () => new UniaryOp<number, number>('logic/numberSin', (a) => (Math.asin(a))));
GlobalNodeRegistry.add('logic/numberCos', () => new UniaryOp<number, number>('logic/numberCos', (a) => (Math.cos(a))));
GlobalNodeRegistry.add('logic/numberAcos', () => new UniaryOp<number, number>('logic/numberCos', (a) => (Math.acos(a))));
GlobalNodeRegistry.add('logic/numberTan', () => new UniaryOp<number, number>('logic/numberTan', (a) => (Math.tan(a))));
GlobalNodeRegistry.add('logic/numberAtan', () => new UniaryOp<number, number>('logic/numberTan', (a) => (Math.atan(a))));

// sampling
GlobalNodeRegistry.add('logic/numberSample', () => new UniaryOp<number, number>('logic/numberSample', (a) => (Math.random())));

// ranges
GlobalNodeRegistry.add('logic/numberSign', () => new UniaryOp<number, number>('logic/numberSign', (a) => (Math.sign(a))));
GlobalNodeRegistry.add('logic/numberAbs', () => new UniaryOp<number, number>('logic/numberAbs', (a) => (Math.abs(a))));
GlobalNodeRegistry.add('logic/numberFloor', () => new UniaryOp<number, number>('logic/numberFloor', (a) => (Math.floor(a))));
GlobalNodeRegistry.add('logic/numberCeil', () => new UniaryOp<number, number>('logic/numberCeil', (a) => (Math.ceil(a))));
GlobalNodeRegistry.add('logic/numberRound', () => new UniaryOp<number, number>('logic/numberCeil', (a) => (Math.round(a))));
GlobalNodeRegistry.add('logic/numberTrunc', () => new UniaryOp<number, number>('logic/numberTrunc', (a) => (Math.trunc(a))));

// boolean logic
GlobalNodeRegistry.add('logic/booleanNot', () => new UniaryOp<boolean, boolean>('logic/booleanNot', (a) => (!a)));

// comparison
GlobalNodeRegistry.add('logic/numberIsNan', () => new UniaryOp<number, boolean>('logic/numberIsNan', (a) => (Number.isNaN(a))));
GlobalNodeRegistry.add('logic/numberIsInf', () => new UniaryOp<number, boolean>('logic/numberIsInf', (a) => ((!Number.isFinite(a)) && !Number.isNaN(a))));

// conversion
GlobalNodeRegistry.add('logic/numberToString', () => new UniaryOp<number, string>('logic/numberToString', (a) => (a.toString())));

// string utilities
GlobalNodeRegistry.add('logic/stringLength', () => new UniaryOp<string, number>('logic/stringLength', (a) => (a.length)));
