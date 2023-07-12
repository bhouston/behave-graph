import {
  DefaultLogger,
  Dependencies,
  makeCoreDependencies,
  ManualLifecycleEventEmitter
} from '@behave-graph/core';
import { useEffect, useState } from 'react';

export const useCoreDependencies = () => {
  const [dependencies] = useState(() =>
    makeCoreDependencies({
      lifecycleEmitter: new ManualLifecycleEventEmitter(),
      logger: new DefaultLogger()
    })
  );

  return dependencies;
};

export const useMergeDependencies = (
  a: Dependencies | undefined,
  b: Dependencies | undefined
): Dependencies | undefined => {
  const [merged, setMerged] = useState<Dependencies>();

  useEffect(() => {
    if (!a || !b) setMerged(undefined);
    else
      setMerged({
        ...a,
        ...b
      });
  }, [a, b]);

  return merged;
};

export const useDependency = (
  dependency: any,
  createDependency: (dependency: any) => Dependencies
) => {
  const [dependencies, setDependencies] = useState<Dependencies>();

  useEffect(() => {
    if (typeof dependency === 'undefined') setDependencies(undefined);
    else setDependencies(createDependency(dependency));
  }, [dependency, createDependency]);

  return dependencies;
};
