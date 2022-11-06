import { GraphEvaluator, ILifecycleEventEmitter } from '@behavior-graph/framework';
import { OrbitControls, Stage, useCursor } from '@react-three/drei';
import { Canvas, ObjectMap } from '@react-three/fiber';
import { Fragment, useEffect, useMemo, useRef, useState } from 'react';
import { Object3D } from 'three';
import { GLTF } from 'three/examples/jsm/loaders/GLTFLoader';
import RunGraphModificationsOnScene from './RunGraphModificationsOnScene';
import { OnClickListener } from './useSceneModifier';

const Scene = ({
  scene,
  run,
  graphEvaluator,
  lifecycleEmitter,
  onClickListeners,
}: {
  scene: GLTF & ObjectMap;
  run: boolean;
  graphEvaluator: GraphEvaluator | undefined;
  lifecycleEmitter: ILifecycleEventEmitter;
  onClickListeners: OnClickListener[];
}) => {
  const mainRef = useRef<Object3D>();
  const [hovered, setHovered] = useState(false);
  useCursor(hovered, 'pointer', 'auto');

  const clickedListeners = useMemo(() => {
    return (
      <>
        {onClickListeners.map((listener, i) => {
          if (listener.path.resource === 'nodes') {
            const node = scene.nodes[listener.path.name];

            if (node) {
              const cloned = node.clone();
              return (
                <primitive
                  key={i}
                  object={cloned}
                  visible={false}
                  onClick={() => listener.callback(listener.jsonPath)}
                  onPointerOver={() => setHovered(true)}
                  onPointerOut={() => setHovered(false)}
                />
              );
            }

            return <Fragment key={i}></Fragment>;
          }
        })}
      </>
    );
  }, [onClickListeners, scene]);

  return (
    <Canvas className="w-full h-full">
      <OrbitControls target={mainRef.current?.position} makeDefault />
      <Stage shadows adjustCamera intensity={1} environment="city" preset="rembrandt">
        <>
          <primitive object={scene.scene} ref={mainRef} />
          {clickedListeners}
        </>
      </Stage>

      {graphEvaluator && lifecycleEmitter && (
        <RunGraphModificationsOnScene graphEvaluator={graphEvaluator} lifecycleEmitter={lifecycleEmitter} run={run} />
      )}
    </Canvas>
  );
};

export default Scene;
