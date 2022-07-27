import NumberSocket from '../../Sockets/Typed/NumberSocket';
import Node from '../Node';

import NodeEvalContext from '../NodeEvalContext';

export default class BinaryOp<Input, Output> extends Node {
  constructor(nodeName: string, public binaryEvalFunc: (a: Input, b: Input) => Output) {
    super(
      nodeName,
      [
        new NumberSocket('a'),
        new NumberSocket('b'),
      ],
      [new NumberSocket('sum')],
      (context: NodeEvalContext, inputValues: Map<string, any>) => {
        const outputValues = new Map<string, any>();
        outputValues.set('sum', this.binaryEvalFunc(inputValues.get('a'), inputValues.get('b')));
        return outputValues;
      },
    );
  }
}
