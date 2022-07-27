import NumberSocket from './Sockets/Spec/NumberSocket';
import Node from '../../../Nodes/Node';
import NodeEvalContext from '../NodeEvalContext';

export default class NullaryOp<Output> extends Node {
  constructor(nodeName: string, public nullaryEvalFunc: () => Output) {
    super(
      nodeName,
      [
        new NumberSocket('a'),
        new NumberSocket('b'),
      ],
      [new NumberSocket('result')],
      (context: NodeEvalContext, inputValues: Map<string, any>) => {
        const outputValues = new Map<string, any>();
        outputValues.set('result', this.nullaryEvalFunc());
        return outputValues;
      },
    );
  }
}
