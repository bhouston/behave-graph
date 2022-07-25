import NumberSocketSpec from '../../Specs/Sockets/NumberSocketSpec';
import EvalSocketSpec from '../../Specs/Sockets/EvalSocketSpec';
import NodeSpec from '../../Specs/Nodes/NodeSpec';

export class NodeScaleSpec extends NodeSpec {
  constructor() {
    super(
      'action',
      'nodeScale',
      [
        new EvalSocketSpec(),
        new NumberSocketSpec('nodeIndex'),
        new NumberSocketSpec('xScale'),
        new NumberSocketSpec('yScale'),
        new NumberSocketSpec('zScale'),
      ],
      [new EvalSocketSpec()],
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
