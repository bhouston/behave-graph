import {
  DefaultLogger,
  ManualLifecycleEventEmitter,
  registerCoreProfile,
  registerLifecycleEventEmitter,
  registerLogger,
  registerSceneProfile,
  Registry
} from '@behave-graph/core';
import { useState } from 'react';

const createRegistry = () => {
  const registry = new Registry();
  const logger = new DefaultLogger();
  const manualLifecycleEventEmitter = new ManualLifecycleEventEmitter();
  registerCoreProfile(registry);
  registerSceneProfile(registry);
  registerLogger(registry.dependencies, logger);
  registerLifecycleEventEmitter(
    registry.dependencies,
    manualLifecycleEventEmitter
  );

  return {
    registry,
    logger,
    manualLifecycleEventEmitter
  };
};

export const useRegistry = () => {
  const [registry] = useState<{
    registry: Registry;
    logger: DefaultLogger;
    manualLifecycleEventEmitter: ManualLifecycleEventEmitter;
  }>(() => createRegistry());
  return registry;
};
