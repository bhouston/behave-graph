import {
  getCoreNodeDefinitions,
  getCoreValueTypes,
  ValueTypeMap
} from '@oveddan-behave-graph/core';
import { useMemo } from 'react';

import { useCoreDependencies } from './useDependencies';

export const useCoreValueDefinitions = () => {
  return useMemo(() => getCoreValueTypes(), []);
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
