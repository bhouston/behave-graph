import {
  DefaultLogger,
  getCoreNodeDefinitions,
  getCoreValueMap,
  ManualLifecycleEventEmitter,
  NodeSpecJSON,
  writeNodeSpecsToJSON
} from '@behave-graph/core';

let nodeSpecJSON: NodeSpecJSON[] | undefined = undefined;

export const getNodeSpecJSON = (): NodeSpecJSON[] => {
  if (nodeSpecJSON === undefined) {
    const lifecycleEventEmitter = new ManualLifecycleEventEmitter();
    const logger = new DefaultLogger();
    const valueTypeMap = getCoreValueMap();
    const nodeDefinitionMap = getCoreNodeDefinitions(valueTypeMap);
    nodeSpecJSON = writeNodeSpecsToJSON({
      nodes: nodeDefinitionMap,
      values: valueTypeMap,
      dependencies: {
        logger,
        lifecycleEventEmitter
      }
    });
  }
  return nodeSpecJSON;
};
