import NumberSocketSpec from '../../Specs/Sockets/NumberSocketSpec';
import EvalSocketSpec from '../../Specs/Sockets/EvalSocketSpec';
import NodeSpec from '../../Specs/Nodes/NodeSpec';

export class NodeTranslateSpec extends NodeSpec {
  constructor() {
    super(
      'action',
      'nodeTranslate',
      [
        new EvalSocketSpec(),
        new NumberSocketSpec('nodeIndex'),
        new NumberSocketSpec('xTranslation'),
        new NumberSocketSpec('yTranslation'),
        new NumberSocketSpec('zTranslation'),
      ],
      [new EvalSocketSpec()],
      (context, inputValues) => {
        const outputValues = new Map<string, any>();
        outputValues.set('eval', true);
        return outputValues;
        // const node = context.getSceneNodeByIndex(inputs['node']);
        // node.translation.add(inputs['offset']);
        // return { eval: true };
      },
    );
  }
}
