import { NodeConfigurationJSON } from '@behave-graph/core';
import { NodeSpecGenerator } from '../hooks/useNodeSpecGenerator.js';

export const getSocketsByNodeTypeAndHandleType = (
  specGenerator: NodeSpecGenerator,
  nodeType: string | undefined,
  nodeConfiguration: NodeConfigurationJSON,
  handleType: 'source' | 'target' | null,
) => {
  if (nodeType === undefined) return [];
  const nodeSpec = specGenerator.getNodeSpec(nodeType, nodeConfiguration);
  return handleType === 'source' ? nodeSpec.outputs : nodeSpec.inputs;
};
