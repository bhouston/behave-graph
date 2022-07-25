import NumberSocket from '../../Specs/Sockets/NumberSocket';
import EvalSocket from '../../Specs/Sockets/EvalSocket';
import NodeSpec from '../../Specs/Nodes/NodeSpec';

export class NodeTranslateSpec extends NodeSpec {
  constructor() {
    super(
      'action',
      'nodeTranslate',
      [
        new EvalSocket(),
        new NumberSocket('nodeIndex'),
        new NumberSocket('xTranslation'),
        new NumberSocket('yTranslation'),
        new NumberSocket('zTranslation'),
      ],
      [new EvalSocket()],
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
