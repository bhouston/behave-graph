import { GraphEvaluator, ILifecycleEventEmitter } from '@behavior-graph/framework';
import { useFrame } from '@react-three/fiber';
import { useEffect, useState } from 'react';

const ContinuouslyModifyScene = ({
  graphEvaluator,
  lifecycleEmitter,
}: {
  graphEvaluator: GraphEvaluator;
  lifecycleEmitter: ILifecycleEventEmitter;
}) => {
  useEffect(() => {
    let timeout: number = 0;
    console.log('Starting animation');
    const onTick = async () => {
      console.log('animating');
      lifecycleEmitter.tickEvent.emit();

      await graphEvaluator.executeAllAsync(500);

      timeout = window.setTimeout(onTick, 50);
    };

    timeout = window.setTimeout(onTick, 50);

    return () => {
      window.clearTimeout(timeout);
    };
  }, [lifecycleEmitter, graphEvaluator]);

  return null;
};

// export const useGraphEvaluator = ({ registry, graph }: { registry: Registry | undefined; graph: Graph | undefined }) => {
//   const [graphEvaluator, setGraphEvaluator] = useState<GraphEvaluator>();
//   const [manualLifecycleEventEmitter, setManualLifeCycleEventEmitter] = useState<ManualLifecycleEventEmitter>();

//   useEffect(() => {
//     if (!registry || !graph) return;

//     const graphEvaluator = new GraphEvaluator(graph);
//     graphEvaluator.executeAllSync();

//     (async () => {
//       const manualLifecycleEventEmitter = registry.abstractions.get('ILifecycleEventEmitter') as ILifecycleEventEmitter;
//       if (manualLifecycleEventEmitter.startEvent.listenerCount > 0) {
//         manualLifecycleEventEmitter.startEvent.emit();

//         await graphEvaluator.executeAllAsync(5);
//       }
//       setGraphEvaluator(graphEvaluator);
//       setManualLifeCycleEventEmitter(manualLifecycleEventEmitter);
//     })();
//   }, [graph, registry]);

//   useFrame(async () => {
//     if (!manualLifecycleEventEmitter || !graphEvaluator) return;

//     manualLifecycleEventEmitter.tickEvent.emit();

//     await graphEvaluator.executeAllAsync(500);
//   });
// };

const RunGraphModificationsOnScene = ({
  graphEvaluator,
  lifecycleEmitter,
}: {
  graphEvaluator: GraphEvaluator;
  lifecycleEmitter: ILifecycleEventEmitter;
}) => {
  useEffect(() => {
    let timeout: number;
    (async () => {
      await graphEvaluator.executeAllSync();

      if (lifecycleEmitter.startEvent.listenerCount > 0) {
        lifecycleEmitter.startEvent.emit();

        // Logger.verbose('executing all (async)');
        await graphEvaluator.executeAllAsync(5);
      }

      const onTick = async () => {
        lifecycleEmitter.tickEvent.emit();

        // Logger.verbose('executing all (async)');
        // eslint-disable-next-line no-await-in-loop
        await graphEvaluator.executeAllAsync(500);

        timeout = window.setTimeout(onTick, 50);
      };

      timeout = window.setTimeout(onTick, 50);
    })();

    return () => {
      window.clearTimeout(timeout);
    };
  }, []);

  return null;
  // if (!started) return null;

  // return <ContinuouslyModifyScene lifecycleEmitter={lifecycleEmitter} graphEvaluator={graphEvaluator} />;
};

export default RunGraphModificationsOnScene;
