import {
  IRegistry,
  NodeSpecJSON,
  writeNodeSpecsToJSON
} from '@behave-graph/core';
import { useEffect, useState } from 'react';

export const useNodeSpecJson = ({
  registry
}: {
  registry: IRegistry | undefined;
}) => {
  const [specJson, setSpecJson] = useState<NodeSpecJSON[]>();

  useEffect(() => {
    if (!registry) {
      setSpecJson(undefined);
      return;
    }
    setSpecJson(writeNodeSpecsToJSON(registry));
  }, [registry]);

  return specJson;
};
