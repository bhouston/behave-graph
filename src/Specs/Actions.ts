import { SocketValueType } from "../Core/Sockets/SocketValueType";
import {
  EvalSocketSpec,
  NumberSocketSpec,
  SocketSpec,
  StringSocketSpec,
} from "../Core/Sockets/SocketSpec";
import { NodeSpec } from "../Core/Nodes/NodeSpec";
import { GlobalNodeSpecRegistry } from "./NodeSpecRegistry";

// ACTIONS
GlobalNodeSpecRegistry.add(
  new NodeSpec(
    "action",
    "debugOutput",
    [new EvalSocketSpec(), new StringSocketSpec("text")],
    [new EvalSocketSpec()],
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
    [new EvalSocketSpec(), new NumberSocketSpec("nodeIndex")],
    [new EvalSocketSpec()],
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
    [new EvalSocketSpec(), new NumberSocketSpec("nodeIndex")],
    [new EvalSocketSpec()],
    (context, inputValues) => {
      const outputValues = new Map<string, any>();
      outputValues.set("eval", true);
      return outputValues;
      //const node = context.getSceneNodeByIndex(inputs['node']);
      //node.visible = true;
      //return { eval: true };
    }
  )
);

GlobalNodeSpecRegistry.add(
  new NodeSpec(
    "action",
    "translate",
    [
      new EvalSocketSpec(),
      new NumberSocketSpec("nodeIndex"),
      new NumberSocketSpec("offsetX"),
      new NumberSocketSpec("offsetY"),
      new NumberSocketSpec("offsetZ"),
    ],
    [new EvalSocketSpec()],
    (context, inputValues) => {
      const outputValues = new Map<string, any>();
      outputValues.set("eval", true);
      return outputValues;
      //const node = context.getSceneNodeByIndex(inputs['node']);
      //node.translation.add(inputs['offset']);
      //return { eval: true };
    }
  )
);

GlobalNodeSpecRegistry.add(
  new NodeSpec(
    "action",
    "rotation",
    [
      new EvalSocketSpec(),
      new NumberSocketSpec("nodeIndex"),
      new NumberSocketSpec("deltaX"),
      new NumberSocketSpec("deltaY"),
      new NumberSocketSpec("deltaZ"),
    ],
    [new EvalSocketSpec()],
    (context, inputValues) => {
      const outputValues = new Map<string, any>();
      outputValues.set("eval", true);
      return outputValues;
      //const node = context.getSceneNodeByIndex(inputs['node']);
      //node.rotation.add(inputs['eulerDelta']);
      //return { eval: true };
    }
  )
);

GlobalNodeSpecRegistry.add(
  new NodeSpec(
    "action",
    "scale",
    [
      new EvalSocketSpec(),
      new NumberSocketSpec("nodeIndex"),
      new NumberSocketSpec("factorX"),
      new NumberSocketSpec("factorY"),
      new NumberSocketSpec("factorZ"),
    ],
    [new EvalSocketSpec()],
    (context, inputValues) => {
      const outputValues = new Map<string, any>();
      outputValues.set("eval", true);
      return outputValues;
      //const node = context.getSceneNodeByIndex(inputs['node']);
      //node.scale.multiplyByVector(inputs['factor']);
      //return { eval: true };
    }
  )
);
