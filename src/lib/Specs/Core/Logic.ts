import { SocketValueType } from '../Core/Sockets/SocketValueType';
import SocketSpec from '../Core/Sockets/Spec/SocketSpec';
import NumberSocketSpec from '../Core/Sockets/Spec/NumberSocketSpec';
import StringSocketSpec from '../Core/Sockets/Spec/StringSocketSpec';
import EvalSocketSpec from '../Core/Sockets/Spec/EvalSocketSpec';
import NodeSpec from '../Core/Nodes/Spec/NodeSpec';
import { GlobalNodeSpecRegistry, NodeSpecRegistry } from './NodeSpecRegistry';

export default function registerDefaultLogic(nodeSpecRegistry: NodeSpecRegistry) {
  nodeSpecRegistry.add(
    new NodeSpec(
      'logic',
      'rnumberRandom',
      [],
      [new NumberSocketSpec('sample')],
      (context, inputValues) => {
        const outputValues = new Map<string, any>();
        outputValues.set('sample', Math.random());
        return outputValues;
      },
    ),
  );

  nodeSpecRegistry.add(
    new NodeSpec(
      'logic',
      'numberAdd',
      [
        new NumberSocketSpec('a'),
        new NumberSocketSpec('b'),
      ],
      [new NumberSocketSpec('sum')],
      (context, inputValues) => {
        const outputValues = new Map<string, any>();
        outputValues.set('sum', inputValues.get('a') + inputValues.get('b'));
        return outputValues;
      },
    ),
  );

  nodeSpecRegistry.add(
    new NodeSpec(
      'logic',
      'stringLength',
      [
        new StringSocketSpec('text'),
      ],
      [new NumberSocketSpec('length')],
      (context, inputValues) => {
        const outputValues = new Map<string, any>();
        outputValues.set('length', inputValues.get('text').length);
        return outputValues;
      },
    ),
  );
}
