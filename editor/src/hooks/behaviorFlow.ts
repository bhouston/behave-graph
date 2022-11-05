import {
  Graph,
  GraphEvaluator,
  ILifecycleEventEmitter,
  IScene,
  ManualLifecycleEventEmitter,
  registerCoreProfile,
  registerSceneProfile,
  Registry,
} from '@behavior-graph/framework';
import { useFrame } from '@react-three/fiber';
import { useEffect, useState } from 'react';

export const useRegistry = ({ scene }: { scene: IScene }) => {
  const [registry, setRegistry] = useState<Registry>();

  useEffect(() => {
    const registry = new Registry();
    registerCoreProfile(registry);
    registerSceneProfile(registry, scene);
    setRegistry(registry);
  }, [scene]);

  return registry;
};

export const useGraphEvaluator = ({
  registry,
  graph,
  eventEmitter,
}: {
  registry: Registry | undefined;
  graph: Graph | undefined;
  eventEmitter: ILifecycleEventEmitter;
}) => {
  const [graphEvaluator, setGraphEvaluator] = useState<GraphEvaluator>();
  const [manualLifecycleEventEmitter, setManualLifeCycleEventEmitter] = useState<ManualLifecycleEventEmitter>();

  useEffect(() => {
    if (!registry || !graph) return;

    const graphEvaluator = new GraphEvaluator(graph);
    graphEvaluator.executeAllSync();

    (async () => {
      if (eventEmitter.startEvent.listenerCount > 0) {
        eventEmitter.startEvent.emit();

        await graphEvaluator.executeAllAsync(5);
      }
      setGraphEvaluator(graphEvaluator);
      setManualLifeCycleEventEmitter(eventEmitter);
    })();
  }, [eventEmitter, graph, registry]);

  useFrame(async () => {
    if (!manualLifecycleEventEmitter || !graphEvaluator) return;

    manualLifecycleEventEmitter.tickEvent.emit();

    await graphEvaluator.executeAllAsync(500);
  });
};
