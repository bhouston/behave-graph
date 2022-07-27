import NumberSocket from './Sockets/Spec/NumberSocket';
import Node from '../../../Nodes/Node';
import NodeEvalContext from '../NodeEvalContext';
import { GlobalNodeRegistry } from '../GlobalNodeRegistry';

export type NullaryOpFunc<Output> = () => Output;

export class NullaryOp<Output> extends Node {
  constructor(nodeName: string, public uniaryOpFunc: NullaryOpFunc<Output>) {
    super(
      nodeName,
      [
        new NumberSocket('a'),
        new NumberSocket('b'),
      ],
      [new NumberSocket('result')],
      (context: NodeEvalContext, inputValues: Map<string, any>) => {
        const outputValues = new Map<string, any>();
        outputValues.set('result', this.uniaryOpFunc());
        return outputValues;
      },
    );
  }
}

// arithmetic
GlobalNodeRegistry.add('logic/numberPi', () => new NullaryOp<number>('logic/numberNegate', () => (Math.PI)));
GlobalNodeRegistry.add('logic/numberE', () => new NullaryOp<number>('logic/numberSign', () => (Math.E)));
