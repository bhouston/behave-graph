import { GraphEvaluator, ILifecycleEventEmitter } from '@behavior-graph/framework';
import { OrbitControls, Stage } from '@react-three/drei';
import { Canvas, ObjectMap } from '@react-three/fiber';
import { useRef } from 'react';
import { Object3D } from 'three';
import { GLTF } from 'three/examples/jsm/loaders/GLTFLoader';
import RunGraphModificationsOnScene from './RunGraphModificationsOnScene';

const Scene = ({
  scene,
  run,
  graphEvaluator,
  lifecycleEmitter,
}: {
  scene: GLTF & ObjectMap;
  run: boolean;
  graphEvaluator: GraphEvaluator | undefined;
  lifecycleEmitter: ILifecycleEventEmitter;
}) => {
  const mainRef = useRef<Object3D>();
  return (
    <Canvas className="w-full h-full">
      <OrbitControls target={mainRef.current?.position} makeDefault />
      <Stage shadows adjustCamera intensity={1} environment="city" preset="rembrandt">
        <primitive object={scene.scene} ref={mainRef} />
      </Stage>

      {graphEvaluator && lifecycleEmitter && (
        <RunGraphModificationsOnScene graphEvaluator={graphEvaluator} lifecycleEmitter={lifecycleEmitter} run={run} />
      )}
    </Canvas>
  );
};

export default Scene;
