import React from "react";
import ReactDOM from "react-dom/client";
import { Flow } from "@behave-graph/react-flow";
import { GraphJSON } from "@behave-graph/core";
import rawGraph from "./graph.json"

import "reactflow/dist/style.css";
import "./index.css";

const graph = rawGraph as GraphJSON

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <Flow graph={graph} />
  </React.StrictMode>
);
