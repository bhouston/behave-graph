import {
  DefaultLogger,
  getCoreNodeDefinitions,
  getCoreValueMap,
  IRegistry,
  ManualLifecycleEventEmitter
} from '@behave-graph/core';
import { useState } from 'react';

const createRegistry = () => {
  const manualLifecycleEventEmitter = new ManualLifecycleEventEmitter();
  const logger = new DefaultLogger();
  const valueTypeMap = getCoreValueMap();
  const nodeDefinitionMap = getCoreNodeDefinitions(valueTypeMap);

  return {
    registry: {
      nodes: nodeDefinitionMap,
      values: valueTypeMap
    },
    logger,
    manualLifecycleEventEmitter
  };
};

export const useRegistry = () => {
  const [registry] = useState<{
    registry: IRegistry;
    logger: DefaultLogger;
    manualLifecycleEventEmitter: ManualLifecycleEventEmitter;
  }>(() => createRegistry());
  return registry;
};
