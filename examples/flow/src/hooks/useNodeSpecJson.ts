import {
  NodeSpecJSON,
  Registry,
  writeNodeSpecsToJSON
} from '@behave-graph/core';
import { useEffect, useState } from 'react';

const useNodeSpecJson = (registry: Registry | undefined) => {
  const [specJson, setSpecJson] = useState<NodeSpecJSON[]>();

  useEffect(() => {
    if (!registry) return;
    const specJson = writeNodeSpecsToJSON(registry);
    setSpecJson(specJson);
  }, [registry]);

  return specJson;
};

export default useNodeSpecJson;
