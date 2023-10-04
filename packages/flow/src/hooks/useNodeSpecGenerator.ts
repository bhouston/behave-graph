// Generates node specs based on provided configuration,
// and caches the results.

import {
  IRegistry,
  NodeConfigurationJSON,
  NodeSpecJSON,
  writeDefaultNodeSpecsToJSON,
  writeNodeSpecToJSON,
} from '@behave-graph/core';
import { useEffect, useState } from 'react';

export class NodeSpecGenerator {
  private specsWithoutConfig?: NodeSpecJSON[];
  private specsCache: { [cacheKey: string]: NodeSpecJSON } = {};

  constructor(private registry: IRegistry) {}

  getNodeTypes(): string[] {
    return Object.keys(this.registry.nodes);
  }

  getNodeSpec(nodeTypeName: string, configuration: NodeConfigurationJSON): NodeSpecJSON {
    let cacheKey = nodeTypeName + '\x01' + JSON.stringify(configuration);

    if (!this.specsCache[cacheKey]) {
      this.specsCache[cacheKey] = writeNodeSpecToJSON(this.registry, nodeTypeName, configuration);
    }

    return this.specsCache[cacheKey];
  }

  getAllNodeSpecs(): NodeSpecJSON[] {
    if (!this.specsWithoutConfig) {
      this.specsWithoutConfig = writeDefaultNodeSpecsToJSON(this.registry);
    }

    return this.specsWithoutConfig;
  }
}

export const useNodeSpecGenerator = (registry: IRegistry) => {
  const [specGenerator, setSpecGenerator] = useState<NodeSpecGenerator>();

  useEffect(() => {
    setSpecGenerator(new NodeSpecGenerator(registry));
  }, [registry.nodes, registry.values, registry.dependencies]);

  return specGenerator;
};
