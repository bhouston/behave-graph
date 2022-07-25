import NumberSocket from '../../Specs/Sockets/NumberSocket';
import EvalSocket from '../../Specs/Sockets/EvalSocket';
import NodeSpec from '../../Specs/Nodes/NodeSpec';

export class NodeVisibleSpec extends NodeSpec {
  constructor() {
    super(
      'action',
      'visible',
      [new EvalSocket(), new NumberSocket('nodeIndex'), new NumberSocket('visible')],
      [new EvalSocket()],
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
