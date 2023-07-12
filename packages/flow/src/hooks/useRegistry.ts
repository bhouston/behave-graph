import {
  DefaultLogger,
  getCoreNodesMap,
  getCoreValuesMap,
  IRegistry,
  ManualLifecycleEventEmitter,
  memo
} from '@behave-graph/core';
import { useState } from 'react';

export const createRegistry = memo<IRegistry>(() => {
  return {
    nodes: getCoreNodesMap(),
    values: getCoreValuesMap(),
    dependencies: {
      logger: new DefaultLogger(),
      lifecycleEventEmitter: new ManualLifecycleEventEmitter()
    }
  };
});

export const useRegistry = () => {
  const [registry] = useState<IRegistry>(() => createRegistry());
  return registry;
};
