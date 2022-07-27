import NumberSocket from '../../Sockets/Typed/NumberSocket';
import Node from '../Node';

import NodeEvalContext from '../NodeEvalContext';

export default class UniaryOp<Input, Output> extends Node {
  constructor(nodeName: string, public uniaryEvalFunc: (a: Input) => Output) {
    super(
      nodeName,
      [
        new NumberSocket('a'),
        new NumberSocket('b'),
      ],
      [new NumberSocket('result')],
      (context: NodeEvalContext, inputValues: Map<string, any>) => {
        const outputValues = new Map<string, any>();
        outputValues.set('result', this.uniaryEvalFunc(inputValues.get('a')));
        return outputValues;
      },
    );
  }
}
