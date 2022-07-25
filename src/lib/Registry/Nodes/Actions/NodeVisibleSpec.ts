import NumberSocketSpec from '../../Specs/Sockets/NumberSocketSpec';
import EvalSocketSpec from '../../Specs/Sockets/EvalSocketSpec';
import NodeSpec from '../../Specs/Nodes/NodeSpec';

export class NodeVisibleSpec extends NodeSpec {
  constructor() {
    super(
      'action',
      'visible',
      [new EvalSocketSpec(), new NumberSocketSpec('nodeIndex'), new NumberSocketSpec('visible')],
      [new EvalSocketSpec()],
      (context, inputValues) => {
        // const node = context.getSceneNodeByIndex(inputs['node']);
        // node.visible = false;
        const outputValues = new Map<string, any>();
        outputValues.set('eval', inputValues.get('visible'));
        return outputValues;
      },
    );
  }
}
