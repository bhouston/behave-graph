import { NodeTypes } from "reactflow";
import { Node } from "../components/Node";
import { getNodeSpecJSON } from "./getNodeSpecJSON";

const spec = getNodeSpecJSON();

export const customNodeTypes = spec.reduce((nodes, node) => {
  nodes[node.type] = (props) => <Node spec={node} {...props} />;
  return nodes;
}, {} as NodeTypes);
