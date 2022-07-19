import { SocketValueType } from "../Core/Sockets/SocketValueType";
import {
  EvalSocketSpec,
  NumberSocketSpec,
  SocketSpec,
  StringSocketSpec,
} from "../Core/Sockets/SocketSpec";
import { NodeSpec } from "../Core/Nodes/NodeSpec";
import { GlobalNodeSpecRegistry } from "./NodeSpecRegistry";

// MATH - note, no evals.
GlobalNodeSpecRegistry.add(
  new NodeSpec(
    "math",
    "random",
    [],
    [new NumberSocketSpec("sample")],
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
      new NumberSocketSpec("a"),
      new NumberSocketSpec("b"),
    ],
    [new NumberSocketSpec("sum")],
    (context, inputValues) => {
      const outputValues = new Map<string, any>();
      outputValues.set("sum", inputValues.get("a") + inputValues.get("b"));
      return outputValues;
    }
  )
);
