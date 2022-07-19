import { SocketValueType } from "../Core/Sockets/SocketValueType";
import { SocketSpec } from "../Core/Sockets/SocketSpec";
import { NodeSpec } from "../Core/Nodes/NodeSpec";
import { GlobalNodeSpecRegistry } from "./NodeSpecRegistry";

GlobalNodeSpecRegistry.add(
  new NodeSpec(
    "flowcontrol",
    "if",
    [
      new SocketSpec(SocketValueType.Eval, "eval"),
      new SocketSpec(SocketValueType.Boolean, "condition"),
    ],
    [
      new SocketSpec(SocketValueType.Eval, "true"),
      new SocketSpec(SocketValueType.Eval, "false"),
    ],
    (context, inputValues) => {
      // form 1:
      const outputValues = new Map<string, any>();
      if (inputValues.get("condition")) {
        outputValues.set("true", true);
      } else {
        outputValues.set("false", true);
      }
      return outputValues;
    }
  )
);

// ASYNC - asynchronous evaluation

// also called "delay"
GlobalNodeSpecRegistry.add(
  new NodeSpec(
    "flowcontrol",
    "sleep",
    [
      new SocketSpec(SocketValueType.Eval, "eval"),
      new SocketSpec(SocketValueType.Number, "milliseconds"),
    ],
    [new SocketSpec(SocketValueType.Eval, "eval")],
    (context, inputValues) => {
      // TODO: return a promise that results with an async delay - Wayne can you help with this?
      const outputValues = new Map<string, any>();
      outputValues.set("eval", true);
      return outputValues;
    }
  )
);

// https://docs.unrealengine.com/4.27/en-US/ProgrammingAndScripting/Blueprints/UserGuide/FlowControl/
GlobalNodeSpecRegistry.add(
  new NodeSpec(
    "flowcontrol",
    "sequence",
    [new SocketSpec(SocketValueType.Eval, "eval")],
    [
      new SocketSpec(SocketValueType.Eval, "1"),
      new SocketSpec(SocketValueType.Eval, "2"),
      new SocketSpec(SocketValueType.Eval, "2"),
    ],
    (context, inputValues) => {
      // these outputs are fired sequentially in an async fashion but without delays.  Thus a promise is returned and it continually returns a promise until each of the sequences has been executed.
      const outputValues = new Map<string, any>();
      outputValues.set("1", true);
      return outputValues;
    }
  )
);

GlobalNodeSpecRegistry.add(
  new NodeSpec(
    "loflowcontrolgic",
    "forloop",
    [
      new SocketSpec(SocketValueType.Eval, "eval"),
      new SocketSpec(SocketValueType.Number, "startIndex"),
      new SocketSpec(SocketValueType.Number, "endIndex"),
    ],
    [
      new SocketSpec(SocketValueType.Eval, "loopBody"),
      new SocketSpec(SocketValueType.Number, "index"),
      new SocketSpec(SocketValueType.Eval, "completed"),
    ],
    (context, inputValues) => {
      // TODO: Figure out how to have multiple multiple "loop" evals each with an index
      // and then, once done, eval "complete"
      const outputValues = new Map<string, any>();
      outputValues.set("loopBody", true);
      outputValues.set("index", inputValues.get("startIndex"));
      return outputValues;
    }
  )
);
