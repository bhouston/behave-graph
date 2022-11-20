import {
  DefaultLogger,
  ILifecycleEventEmitter,
  ILogger,
  ManualLifecycleEventEmitter,
  registerCoreProfile,
  Registry
} from '@behave-graph/core';
import { useEffect, useState } from 'react';

export const useRegistry = ({
  registerProfiles
}: {
  registerProfiles: (registry: Registry) => void;
}) => {
  const [registry, setRegistry] = useState<Registry>();

  const [lifecyleEmitter, setLifecycleEmitter] =
    useState<ILifecycleEventEmitter>(new ManualLifecycleEventEmitter());
  const [logger] = useState<ILogger>(new DefaultLogger());

  useEffect(() => {
    const registry = new Registry();
    const lifecyleEmitter = new ManualLifecycleEventEmitter();
    registerCoreProfile(registry, logger, lifecyleEmitter);
    registerProfiles(registry);

    setRegistry(registry);
    setLifecycleEmitter(lifecyleEmitter);
  }, [registerProfiles, logger]);

  return { registry, lifecyleEmitter, logger };
};
