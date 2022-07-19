import { SocketValueType } from "../SocketValueType";
import { SocketSpec } from "../SocketSpec";
import { NodeSpec } from "../NodeSpec";
import { GlobalNodeSpecRegistry } from "../registry";

// ACTIONS
GlobalNodeSpecRegistry.add(
  new NodeSpec(
    "action",
    "debugOutput",
    [
      new SocketSpec(SocketValueType.Eval, "eval"),
      new SocketSpec(SocketValueType.String, "text"),
    ],
    [new SocketSpec(SocketValueType.Eval, "eval")],
    (context, inputValues) => {
      console.log("Debug Output: " + inputValues.get("text"));

      const outputValues = new Map<string, any>();
      outputValues.set("eval", true);
      return outputValues;
    }
  )
);

GlobalNodeSpecRegistry.add(
  new NodeSpec(
    "action",
    "show",
    [
      new SocketSpec(SocketValueType.Eval, "eval"),
      new SocketSpec(SocketValueType.Number, "nodeIndex"),
    ],
    [new SocketSpec(SocketValueType.Eval, "eval")],
    (context, inputValues) => {
      // const node = context.getSceneNodeByIndex(inputs['node']);
      // node.visible = false;
      const outputValues = new Map<string, any>();
      outputValues.set("eval", true);
      return outputValues;
    }
  )
);

GlobalNodeSpecRegistry.add(
  new NodeSpec(
    "action",
    "hide",
    [
      new SocketSpec(SocketValueType.Eval, "eval"),
      new SocketSpec(SocketValueType.Number, "nodeIndex"),
    ],
    [new SocketSpec(SocketValueType.Eval, "eval")],
    (context, inputValues) => {
      const outputValues = new Map<string, any>();
      outputValues.set("eval", true);
      return outputValues;
      //const node = context.getSceneNodeByIndex(inputs['node']);
      //node.visible = true;
      return { eval: true };
    }
  )
);

GlobalNodeSpecRegistry.add(
  new NodeSpec(
    "action",
    "translate",
    [
      new SocketSpec(SocketValueType.Eval, "eval"),
      new SocketSpec(SocketValueType.Number, "nodeIndex"),
      new SocketSpec(SocketValueType.Vector3, "offset"),
    ],
    [new SocketSpec(SocketValueType.Eval, "eval")],
    (context, inputValues) => {
      const outputValues = new Map<string, any>();
      outputValues.set("eval", true);
      return outputValues;
      //const node = context.getSceneNodeByIndex(inputs['node']);
      //node.translation.add(inputs['offset']);
      return { eval: true };
    }
  )
);

GlobalNodeSpecRegistry.add(
  new NodeSpec(
    "action",
    "rotation",
    [
      new SocketSpec(SocketValueType.Eval, "eval"),
      new SocketSpec(SocketValueType.Number, "nodeIndex"),
      new SocketSpec(SocketValueType.Vector3, "delta"),
    ],
    [new SocketSpec(SocketValueType.Eval, "eval")],
    (context, inputValues) => {
      const outputValues = new Map<string, any>();
      outputValues.set("eval", true);
      return outputValues;
      //const node = context.getSceneNodeByIndex(inputs['node']);
      //node.rotation.add(inputs['eulerDelta']);
      return { eval: true };
    }
  )
);

GlobalNodeSpecRegistry.add(
  new NodeSpec(
    "action",
    "scale",
    [
      new SocketSpec(SocketValueType.Eval, "eval"),
      new SocketSpec(SocketValueType.Number, "nodeIndex"),
      new SocketSpec(SocketValueType.Vector3, "factor"),
    ],
    [new SocketSpec(SocketValueType.Eval, "eval")],
    (context, inputValues) => {
      const outputValues = new Map<string, any>();
      outputValues.set("eval", true);
      return outputValues;
      //const node = context.getSceneNodeByIndex(inputs['node']);
      //node.scale.multiplyByVector(inputs['factor']);
      return { eval: true };
    }
  )
);
