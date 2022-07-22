import { SocketValueType } from '../../Core/Sockets/SocketValueType';
import SocketSpec from '../../Core/Sockets/Spec/SocketSpec';
import NumberSocketSpec from '../../Core/Sockets/Spec/NumberSocketSpec';
import StringSocketSpec from '../../Core/Sockets/Spec/StringSocketSpec';
import EvalSocketSpec from '../../Core/Sockets/Spec/EvalSocketSpec';
import NodeSpec from '../../Core/Nodes/Spec/NodeSpec';

import { GlobalNodeSpecRegistry, NodeSpecRegistry } from '../NodeSpecRegistry';

export default function registerDefaultActions(nodeSpecRegistry:NodeSpecRegistry) {
  nodeSpecRegistry.add(
    new NodeSpec(
      'action',
      'debugOutput',
      [new EvalSocketSpec(), new StringSocketSpec('text')],
      [new EvalSocketSpec()],
      (context, inputValues) => {
        console.log(`Debug Output: ${inputValues.get('text')}`);

        const outputValues = new Map<string, any>();
        outputValues.set('eval', true);
        return outputValues;
      },
    ),
  );

  nodeSpecRegistry.add(
    new NodeSpec(
      'action',
      'show',
      [new EvalSocketSpec(), new NumberSocketSpec('nodeIndex')],
      [new EvalSocketSpec()],
      (context, inputValues) => {
      // const node = context.getSceneNodeByIndex(inputs['node']);
      // node.visible = false;
        const outputValues = new Map<string, any>();
        outputValues.set('eval', true);
        return outputValues;
      },
    ),
  );

  nodeSpecRegistry.add(
    new NodeSpec(
      'action',
      'hide',
      [new EvalSocketSpec(), new NumberSocketSpec('nodeIndex')],
      [new EvalSocketSpec()],
      (context, inputValues) => {
        const outputValues = new Map<string, any>();
        outputValues.set('eval', true);
        return outputValues;
      // const node = context.getSceneNodeByIndex(inputs['node']);
      // node.visible = true;
      // return { eval: true };
      },
    ),
  );

  nodeSpecRegistry.add(
    new NodeSpec(
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
    ),
  );

  nodeSpecRegistry.add(
    new NodeSpec(
      'action',
      'nodeRotation',
      [
        new EvalSocketSpec(),
        new NumberSocketSpec('nodeIndex'),
        new NumberSocketSpec('xRotation'),
        new NumberSocketSpec('yRotation'),
        new NumberSocketSpec('zRotation'),
      ],
      [new EvalSocketSpec()],
      (context, inputValues) => {
        const outputValues = new Map<string, any>();
        outputValues.set('eval', true);
        return outputValues;
      // const node = context.getSceneNodeByIndex(inputs['node']);
      // node.rotation.add(inputs['eulerDelta']);
      // return { eval: true };
      },
    ),
  );

  nodeSpecRegistry.add(
    new NodeSpec(
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
    ),
  );
}
