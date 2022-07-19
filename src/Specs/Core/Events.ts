import { SocketValueType } from "../SocketValueType";
import { SocketSpec } from "../SocketSpec";
import { NodeSpec } from "../NodeSpec";
import { GlobalNodeSpecRegistry } from "../registry";

// EVENTS
//
// TODO: Figure out how to force the evaluation of these from the outside.
// TODO: Figure out how to set values for the outputs in a consistent way.  Add to context?  Have a set of output values pre-specified when you trigger it?
// QQ: Should one just trigger its outputs directly rather than even evaluating it?

GlobalNodeSpecRegistry.add(
  new NodeSpec(
    "events",
    "sceneStart",
    [],
    [new SocketSpec(SocketValueType.Eval, "eval")],
    (context, inputs) => {
      return new Map<string, any>().set("eval", true);
    }
  )
);

GlobalNodeSpecRegistry.add(
  new NodeSpec(
    "events",
    "tick",
    [],
    [new SocketSpec(SocketValueType.Eval, "eval")],
    (context, inputValues) => {
      const outputValues = new Map<string, any>();
      outputValues.set("eval", true);
      return outputValues;
    }
  )
);

GlobalNodeSpecRegistry.add(
  new NodeSpec(
    "events",
    "nodeClick",
    [],
    [
      new SocketSpec(SocketValueType.Eval, "eval"),
      new SocketSpec(SocketValueType.Number, "nodeIndex"),
    ],
    (context, inputValues) => {
      const outputValues = new Map<string, any>();
      outputValues.set("eval", true);
      outputValues.set("nodeIndex", -1); // TODO: Replace with real value.
      return outputValues;
    }
  )
);
