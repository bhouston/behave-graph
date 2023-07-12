import { getCoreNodesMap, getCoreValuesMap } from '@behave-graph/core';

import { useCoreDependencies } from './useDependencies.js';

export const useCoreRegistry = () => {
  const dependencies = useCoreDependencies();

  return {
    nodeDefinitions: getCoreNodesMap(),
    valuesDefinitions: getCoreValuesMap(),
    dependencies
  };
};
