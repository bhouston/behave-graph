import React from "react";
import ReactDOM from "react-dom/client";

import "reactflow/dist/style.css";
import "./index.css";
import { FlowWrapper as FlowAndScene } from "./FlowAndScene";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <FlowAndScene />
  </React.StrictMode>
);
