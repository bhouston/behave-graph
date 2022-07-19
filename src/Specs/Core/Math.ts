import { SocketValueType } from "../SocketValueType";
import { SocketSpec } from "../SocketSpec";
import { NodeSpec } from "../NodeSpec";
import { GlobalNodeSpecRegistry } from "../registry";

// MATH - note, no evals.
GlobalNodeSpecRegistry.add(
  new NodeSpec(
    "math",
    "random",
    [],
    [new SocketSpec(SocketValueType.Number, "sample")],
    (context, inputValues) => {
      const outputValues = new Map<string, any>();
      outputValues.set("sample", Math.random());
      return outputValues;
    }
  )
);

GlobalNodeSpecRegistry.add(
  new NodeSpec(
    "math",
    "add",
    [
      new SocketSpec(SocketValueType.Number, "a"),
      new SocketSpec(SocketValueType.Number, "b"),
    ],
    [new SocketSpec(SocketValueType.Number, "sum")],
    (context, inputValues) => {
      const outputValues = new Map<string, any>();
      outputValues.set("sum", inputValues.get("a") + inputValues.get("b"));
      return outputValues;
    }
  )
);
