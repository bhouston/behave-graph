import {
  Dependencies,
  IRegistry,
  NodeSpecJSON,
  writeNodeSpecsToJSON
} from '@behave-graph/core';
import { useEffect, useState } from 'react';

export const useNodeSpecJson = ({
  registry,
  dependencies
}: {
  registry: IRegistry | undefined;
  dependencies: Dependencies | undefined;
}) => {
  const [specJson, setSpecJson] = useState<NodeSpecJSON[]>();

  useEffect(() => {
    if (!registry || !dependencies) {
      setSpecJson(undefined);
      return;
    }
    setSpecJson(writeNodeSpecsToJSON({ registry, dependencies }));
  }, [registry, dependencies]);

  return specJson;
};
