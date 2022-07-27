import NumberSocket from './Sockets/Spec/NumberSocket';
import Node from '../../../Nodes/Node';
import NodeEvalContext from '../NodeEvalContext';
import { GlobalNodeRegistry } from '../GlobalNodeRegistry';

export type BinaryOpFunc<Input, Output> = (a: Input, b: Input) => Output;

export class BinaryOp<Input, Output> extends Node {
  constructor(nodeName: string, public binaryOpFunc: BinaryOpFunc<Input, Output>) {
    super(
      nodeName,
      [
        new NumberSocket('a'),
        new NumberSocket('b'),
      ],
      [new NumberSocket('sum')],
      (context: NodeEvalContext, inputValues: Map<string, any>) => {
        const outputValues = new Map<string, any>();
        outputValues.set('sum', this.binaryOpFunc(inputValues.get('a'), inputValues.get('b')));
        return outputValues;
      },
    );
  }
}

// arithmetic
GlobalNodeRegistry.add('logic/numberAdd', () => new BinaryOp<number, number>('logic/numberAdd', (a, b) => (a + b)));
GlobalNodeRegistry.add('logic/numberSubtract', () => new BinaryOp<number, number>('logic/numberSubtract', (a, b) => (a - b)));
GlobalNodeRegistry.add('logic/numberMultiply', () => new BinaryOp<number, number>('logic/numberMultiply', (a, b) => (a * b)));
GlobalNodeRegistry.add('logic/numberDivide', () => new BinaryOp<number, number>('logic/numberDivide', (a, b) => (a / b)));
GlobalNodeRegistry.add('logic/numberPow', () => new BinaryOp<number, number>('logic/numberPow', (a, b) => (a ** b)));

// ranges
GlobalNodeRegistry.add('logic/numberMax', () => new BinaryOp<number, number>('logic/numberMax', (a, b) => (Math.max(a, b))));
GlobalNodeRegistry.add('logic/numberMin', () => new BinaryOp<number, number>('logic/numberMin', (a, b) => (Math.min(a, b))));

// boolean logic
GlobalNodeRegistry.add('logic/booleanAnd', () => new BinaryOp<boolean, boolean>('logic/booleanAnd', (a, b) => (a && b)));
GlobalNodeRegistry.add('logic/booleanOr', () => new BinaryOp<boolean, boolean>('logic/booleanOr', (a, b) => (a || b)));

// comparison
GlobalNodeRegistry.add('logic/numberEqual', () => new BinaryOp<number, boolean>('logic/numberEqual', (a, b) => (a === b)));
GlobalNodeRegistry.add('logic/numberGreaterThan', () => new BinaryOp<number, boolean>('logic/numberGreaterThan', (a, b) => (a > b)));
GlobalNodeRegistry.add('logic/numberGreaterThaOrEqual', () => new BinaryOp<number, boolean>('logic/numberGreaterThaOrEqual', (a, b) => (a >= b)));
GlobalNodeRegistry.add('logic/numberLessThan', () => new BinaryOp<number, boolean>('logic/numberLessThan', (a, b) => (a < b)));
GlobalNodeRegistry.add('logic/numberLessThaOrEqual', () => new BinaryOp<number, boolean>('logic/numberLessThaOrEqual', (a, b) => (a <= b)));

// string utilities
GlobalNodeRegistry.add('logic/stringConcat', () => new BinaryOp<string, string>('logic/stringConcat', (a, b) => (a.concat(b))));
GlobalNodeRegistry.add('logic/stringIncludes', () => new BinaryOp<string, boolean>('logic/stringIncludes', (a, b) => (a.includes(b))));
