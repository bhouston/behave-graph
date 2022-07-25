import NumberSocket from '../../Specs/Sockets/NumberSocket';
import EvalSocket from '../../Specs/Sockets/EvalSocket';
import Node from '../Node';
import NodeEvalContext from '../NodeEvalContext';

export class SetNodeScale extends Node {
  constructor() {
    super(
      'action',
      'setNodeScale',
      [
        new EvalSocket(),
        new NumberSocket('nodeIndex'),
        new NumberSocket('xScale'),
        new NumberSocket('yScale'),
        new NumberSocket('zScale'),
      ],
      [new EvalSocket()],
      (context: NodeEvalContext, inputValues: Map<string, any>) => {
        const outputValues = new Map<string, any>();
        outputValues.set('eval', true);
        return outputValues;
        // const node = context.getSceneNodeByIndex(inputs['node']);
        // node.scale.multiplyByVector(inputs['factor']);
        // return { eval: true };
      },
    );
  }
}
