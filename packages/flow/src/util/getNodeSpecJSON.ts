import { memo, NodeSpecJSON, writeNodeSpecsToJSON } from '@behave-graph/core';

import { useRegistry } from '../hooks/useRegistry.js';

export const getNodeSpecJSON = memo<NodeSpecJSON[]>(() =>
  writeNodeSpecsToJSON(useRegistry())
);
