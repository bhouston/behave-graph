import { OrbitControls, Stage } from '@react-three/drei';
import { Canvas, ObjectMap } from '@react-three/fiber';
import { useState} from 'react';
import { Object3D } from 'three';
import { GLTF } from 'three-stdlib';
import ToggleAnimations from './ToggleAnimations';
import { AnimationsState } from './useScene';
import { OnClickListeners } from '@oveddan-behave-graph/scene'
import { RegisterOnClickListeners } from './RegisterOnClickListeners';

type SceneProps = {
  gltf?: GLTF & ObjectMap;
  onClickListeners: OnClickListeners;
  animationsState: AnimationsState;
};


export const Scene = ({ gltf, onClickListeners, animationsState }: SceneProps) => {
  const [mainRef, setMainRef] = useState<Object3D | null>(null);

  return (
    <Canvas>
      <OrbitControls makeDefault target={mainRef?.position} />

      {gltf && (
        <>
          <Stage shadows adjustCamera={false} intensity={1} environment="city" preset="rembrandt">
            <primitive object={gltf.scene} ref={setMainRef}>
              <RegisterOnClickListeners gltf={gltf} onClickListeners={onClickListeners} />
            </primitive>
          </Stage>
          <ToggleAnimations gltf={gltf} animationsState={animationsState} />
        </>
      )}
    </Canvas>
  );
};