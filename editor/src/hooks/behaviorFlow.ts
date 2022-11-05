import {
  DefaultLogger,
  Graph,
  GraphEvaluator,
  ILifecycleEventEmitter,
  ILogger,
  IScene,
  ManualLifecycleEventEmitter,
  NodeSpecJSON,
  readGraphFromJSON,
  registerCoreProfile,
  registerSceneProfile,
  Registry,
} from '@behavior-graph/framework';
import { useFrame } from '@react-three/fiber';
import { useEffect, useState } from 'react';
import { Node, Edge } from 'reactflow';
import { flowToBehave } from '../flowEditor/transformers/flowToBehave';
import { getNodeSpecJSON } from '../flowEditor/util/getNodeSpecJSON';

export const useRegistry = ({ scene }: { scene: IScene | undefined }) => {
  const [registry, setRegistry] = useState<Registry>();

  const [lifecyleEmitter] = useState<ILifecycleEventEmitter>(new ManualLifecycleEventEmitter());
  const [logger] = useState<ILogger>(new DefaultLogger());

  const [specJson, setSpecJson] = useState<NodeSpecJSON[]>();

  useEffect(() => {
    if (!scene) return;
    const registry = new Registry();
    registerCoreProfile(registry, logger, lifecyleEmitter);
    registerSceneProfile(registry, scene);
    const specJson = getNodeSpecJSON(registry);

    setRegistry(registry);
    setSpecJson(specJson);
  }, [scene]);

  return { registry, specJson, lifecyleEmitter, logger };
};

export function buildGraphEvaluator({
  nodes,
  edges,
  nodeSpecJSON,
  registry,
}: {
  nodes: Node<any>[];
  edges: Edge<any>[];
  nodeSpecJSON: NodeSpecJSON[];
  registry: Registry;
}) {
  const graphJson = flowToBehave(nodes, edges, nodeSpecJSON);
  const graph = readGraphFromJSON(graphJson, registry);

  const graphEvaluator = new GraphEvaluator(graph);

  return graphEvaluator;
}

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
