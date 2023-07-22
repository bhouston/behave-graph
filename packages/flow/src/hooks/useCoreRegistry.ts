import {
  getCoreNodesMap,
  getCoreValuesMap,
  IRegistry
} from '@behave-graph/core';

import { useCoreDependencies } from './useDependencies.js';

export const useCoreRegistry = (): IRegistry => {
  const dependencies = useCoreDependencies();

  return {
    nodes: getCoreNodesMap(),
    values: getCoreValuesMap(),
    dependencies
  };
};
