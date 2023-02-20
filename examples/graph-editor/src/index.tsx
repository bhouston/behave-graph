import React from "react";
import ReactDOM from "react-dom/client";
import { Examples, Flow } from "@oveddan-behave-graph/flow";
import { GraphJSON } from "@oveddan-behave-graph/core";
import rawGraph from "./graph.json"

import "reactflow/dist/style.css";
import "./index.css";

const graph = rawGraph as GraphJSON

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

import Branch from "../../../graphs/core/flow/Branch.json";
import Delay from "../../../graphs/core/time/Delay.json";
import HelloWorld from "../../../graphs/core//HelloWorld.json";
import Polynomial from "../../../graphs/core/logic/Polynomial.json";
import SetGet from "../../../graphs/core/variables/SetGet.json";

// TODO remove when json types fixed in behave-graph
const examples: Examples = {
  branch: Branch as unknown as GraphJSON,
  delay: Delay as unknown as GraphJSON,
  helloWorld: HelloWorld as unknown as GraphJSON,
  polynomial: Polynomial as unknown as GraphJSON,
  setGet: SetGet as unknown as GraphJSON,
} as Record<string, GraphJSON>;

root.render(
  <React.StrictMode>
    <Flow initialGraph={graph} examples={examples} />
  </React.StrictMode>
);
