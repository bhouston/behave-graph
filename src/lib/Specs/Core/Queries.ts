import SocketSpec from '../Core/Sockets/Spec/SocketSpec';
import NumberSocketSpec from '../Core/Sockets/Spec/NumberSocketSpec';
import StringSocketSpec from '../Core/Sockets/Spec/StringSocketSpec';
import EvalSocketSpec from '../Core/Sockets/Spec/EvalSocketSpec';
import NodeSpec from '../Core/Nodes/Spec/NodeSpec';

import { GlobalNodeSpecRegistry } from './NodeSpecRegistry';

export default function registerDefaultQueries(nodeSpecRegistry: NodeSpecRegistry) {
  nodeSpecRegistry.add(
    new NodeSpec(
      'query',
      'nodeTranslation',
      [new StringSocketSpec('nodeIndex')],
      [new NumberSocketSpec('xTranslation'), new NumberSocketSpec('yTranslation'), new NumberSocketSpec('zTranslation')],
      (context, inputValues) => {
        const outputValues = new Map<string, any>();
        outputValues.set('xTranslation', 0);
        outputValues.set('yTranslation', 0);
        outputValues.set('zTranslation', 0);
        return outputValues;
      },
    ),
  );

  nodeSpecRegistry.add(
    new NodeSpec(
      'query',
      'nodeScale',
      [new StringSocketSpec('nodeIndex')],
      [new NumberSocketSpec('xScale'), new NumberSocketSpec('yScale'), new NumberSocketSpec('zScale')],
      (context, inputValues) => {
        const outputValues = new Map<string, any>();
        outputValues.set('xScale', 0);
        outputValues.set('yScale', 0);
        outputValues.set('zScale', 0);
        return outputValues;
      },
    ),
  );

  nodeSpecRegistry.add(
    new NodeSpec(
      'query',
      'nodeRotation',
      [new StringSocketSpec('nodeIndex')],
      [new NumberSocketSpec('xRotation'), new NumberSocketSpec('yRotation'), new NumberSocketSpec('zRotation')],
      (context, inputValues) => {
        const outputValues = new Map<string, any>();
        outputValues.set('xRotation', 0);
        outputValues.set('yRotation', 0);
        outputValues.set('zRotation', 0);
        return outputValues;
      },
    ),
  );
}
