import NumberSocket from '../../Specs/Sockets/NumberSocket';
import EvalSocket from '../../Specs/Sockets/EvalSocket';
import NodeSpec from '../../Specs/Nodes/NodeSpec';

export class NodeScaleSpec extends NodeSpec {
  constructor() {
    super(
      'action',
      'nodeScale',
      [
        new EvalSocket(),
        new NumberSocket('nodeIndex'),
        new NumberSocket('xScale'),
        new NumberSocket('yScale'),
        new NumberSocket('zScale'),
      ],
      [new EvalSocket()],
      (context, inputValues) => {
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
