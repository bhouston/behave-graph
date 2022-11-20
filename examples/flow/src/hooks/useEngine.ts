import {
  Engine,
  GraphJSON,
  ILifecycleEventEmitter,
  readGraphFromJSON,
  Registry
} from '@behave-graph/core';
import { useCallback, useEffect, useState } from 'react';

export const useEngine = ({
  graphJson,
  registry,
  eventEmitter,
  autoRun = false
}: {
  graphJson: GraphJSON | undefined;
  registry: Registry | undefined;
  eventEmitter: ILifecycleEventEmitter;
  autoRun?: boolean;
}) => {
  const [engine, setEngine] = useState<Engine>();

  const [run, setRun] = useState(autoRun);

  const play = useCallback(() => {
    setRun(true);
  }, []);

  const pause = useCallback(() => {
    setRun(false);
  }, []);

  const togglePlay = useCallback(() => {
    setRun((existing) => !existing);
  }, []);

  useEffect(() => {
    if (!graphJson || !registry || !run) return;

    const graph = readGraphFromJSON(graphJson, registry);
    const engine = new Engine(graph);

    setEngine(engine);

    return () => {
      engine.dispose();
      setEngine(undefined);
    };
  }, [graphJson, registry, run]);

  useEffect(() => {
    if (!engine || !run) return;

    engine.executeAllSync();

    let timeout: number;

    const onTick = async () => {
      eventEmitter.tickEvent.emit();

      // eslint-disable-next-line no-await-in-loop
      await engine.executeAllAsync(500);

      timeout = window.setTimeout(onTick, 50);
    };

    (async () => {
      if (eventEmitter.startEvent.listenerCount > 0) {
        eventEmitter.startEvent.emit();

        await engine.executeAllAsync(5);
      } else {
        console.log('has no listener count');
      }
      onTick();
    })();

    return () => {
      window.clearTimeout(timeout);
    };
  }, [eventEmitter, engine, run]);

  return {
    engine,
    playing: run,
    play,
    togglePlay,
    pause
  };
};
