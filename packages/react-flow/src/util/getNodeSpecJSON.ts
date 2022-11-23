import {
  NodeSpecJSON,
  registerCoreProfile,
  registerSceneProfile,
  Registry,
  writeNodeSpecsToJSON,
} from "behave-graph";

let nodeSpecJSON: NodeSpecJSON[] | undefined = undefined;

export const getNodeSpecJSON = (): NodeSpecJSON[] => {
  if (nodeSpecJSON === undefined) {
    const registry = new Registry();
    registerCoreProfile(registry);
    registerSceneProfile(registry);
    nodeSpecJSON = writeNodeSpecsToJSON(registry);
  }
  return nodeSpecJSON;
};
