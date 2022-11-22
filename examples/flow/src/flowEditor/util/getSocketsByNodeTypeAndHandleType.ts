import { NodeSpecJSON } from '@behave-graph/core';

export const getSocketsByNodeTypeAndHandleType = (
  nodes: NodeSpecJSON[],
  nodeType: string | undefined,
  handleType: 'source' | 'target' | null
) => {
  const nodeSpec = nodes.find((node) => node.type === nodeType);
  if (nodeSpec === undefined) return;
  return handleType === 'source' ? nodeSpec.outputs : nodeSpec.inputs;
};
