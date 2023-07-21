import { getSceneNodesMap, getSceneValuesMap } from '@behave-graph/scene';

import { useSceneDependencies } from './useDependencies.js';

export const useSceneRegistry = () => {
  const dependencies = useSceneDependencies();

  return {
    nodeDefinitions: getSceneNodesMap(),
    valuesDefinitions: getSceneValuesMap(),
    dependencies
  };
};
