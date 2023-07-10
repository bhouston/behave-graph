import {
  getCoreNodeDefinitions,
  getCoreValueMap,
  ValueTypeMap
} from '@behave-graph/core';
import { useMemo } from 'react';

import { useCoreDependencies } from './useDependencies.js';

export const useCoreValueDefinitions = () => {
  return useMemo(() => getCoreValueMap(), []);
};

export const useCoreNodeDefinitions = ({
  values
}: {
  values: ValueTypeMap;
}) => {
  return useMemo(() => getCoreNodeDefinitions(values), [values]);
};

export const useCoreRegistry = () => {
  const valuesDefinitions = useCoreValueDefinitions();
  const nodeDefinitions = useCoreNodeDefinitions({
    values: valuesDefinitions
  });
  const dependencies = useCoreDependencies();

  return {
    nodeDefinitions,
    valuesDefinitions,
    dependencies
  };
};
