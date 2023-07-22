import {
  IRegistry,
  NodeSpecJSON,
  writeNodeSpecsToJSON
} from '@behave-graph/core';
import { useEffect, useState } from 'react';

export const useNodeSpecJson = (registry: IRegistry) => {
  const [specJson, setSpecJson] = useState<NodeSpecJSON[]>();

  useEffect(() => {
    if (!registry.nodes || !registry.values || !registry.dependencies) {
      setSpecJson(undefined);
      return;
    }
    setSpecJson(writeNodeSpecsToJSON(registry));
  }, [registry.nodes, registry.values, registry.dependencies]);

  return specJson;
};
