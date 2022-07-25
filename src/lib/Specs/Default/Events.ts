import { SocketValueType } from './Sockets/SocketValueType';
import NodeSpec from './Nodes/Spec/NodeSpec';
import { GlobalNodeSpecRegistry } from './NodeSpecRegistry';
import SocketSpec from './Sockets/Spec/SocketSpec';
import NumberSocketSpec from './Sockets/Spec/NumberSocketSpec';
import StringSocketSpec from './Sockets/Spec/StringSocketSpec';
import EvalSocketSpec from './Sockets/Spec/EvalSocketSpec';

// TODO: Figure out how to force the evaluation of these from the outside.
// TODO: Figure out how to set values for the outputs in a consistent way.  Add to context?  Have a set of output values pre-specified when you trigger it?
// QQ: Should one just trigger its outputs directly rather than even evaluating it?

export default function registerDefaultEvents(nodeSpecRegistry:GlobalNodeSpecRegistry) {
  nodeSpecRegistry.add(
    new NodeSpec(
      'events',
      'sceneStart',
      [],
      [new EvalSocketSpec()],
      (context, inputs) => new Map<string, any>().set('eval', true),
    ),
  );

  nodeSpecRegistry.add(
    new NodeSpec(
      'events',
      'tick',
      [],
      [new EvalSocketSpec()],
      (context, inputValues) => {
        const outputValues = new Map<string, any>();
        outputValues.set('eval', true);
        return outputValues;
      },
    ),
  );

  nodeSpecRegistry.add(
    new NodeSpec(
      'events',
      'nodeClick',
      [],
      [
        new EvalSocketSpec(),
        new NumberSocketSpec('nodeIndex'),
      ],
      (context, inputValues) => {
        const outputValues = new Map<string, any>();
        outputValues.set('eval', true);
        outputValues.set('nodeIndex', -1); // TODO: Replace with real value.
        return outputValues;
      },
    ),
  );
}
