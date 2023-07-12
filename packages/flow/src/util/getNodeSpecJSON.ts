import { memo, NodeSpecJSON, writeNodeSpecsToJSON } from '@behave-graph/core';

import { createRegistry } from '../hooks/useRegistry.js';

export const getNodeSpecJSON = memo<NodeSpecJSON[]>(() =>
  writeNodeSpecsToJSON(createRegistry())
);
