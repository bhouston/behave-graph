import { OrbitControls, Stage, useCursor } from '@react-three/drei';
import { Canvas, ObjectMap } from '@react-three/fiber';
import { useCallback, useEffect, useRef, useState, memo } from 'react';
import { Mesh, Object3D } from 'three';
import { GLTF } from 'three-stdlib';
import ToggleAnimations from './ToggleAnimations';
import { AnimationsState } from './useScene';
import { OnClickListener, OnClickListeners } from '@behave-graph/scene'

const RegisterOnClickListenersOnElements = ({
  jsonPath,
  listeners,
  gltf,
  setHovered,
}: {
  jsonPath: string;
  listeners: OnClickListener;
  gltf: GLTF & ObjectMap;
  setHovered: (hovered: boolean) => void;
}) => {
  const [node, setNode] = useState<Mesh>();

  useEffect(() => {
    if (listeners.path.resource === 'nodes') {
      const node = gltf.nodes[listeners.elementName].clone() as Mesh;

      setNode(node);
      return;
    }
    setNode(undefined);
  }, [listeners.path, gltf]);

  const handleClick = useCallback(() => {
    listeners.callbacks.forEach((cb) => cb(jsonPath));
  }, [listeners.callbacks, jsonPath]);

  if (!node) return null;

  return (
    <primitive
      object={node}
      onClick={handleClick}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    />
  );
};

type SceneProps = {
  gltf?: GLTF & ObjectMap;
  onClickListeners: OnClickListeners;
  animationsState: AnimationsState;
};

const RegisterOnClickListeners = ({ onClickListeners, gltf }: Pick<SceneProps, 'onClickListeners' | 'gltf'>) => {
  const [hovered, setHovered] = useState(false);
  useCursor(hovered, 'pointer', 'auto');

  if (!gltf) return null;

  return (
    <>
      {Object.entries(onClickListeners).map(([jsonPath, listeners]) => (
        <RegisterOnClickListenersOnElements
          key={jsonPath}
          gltf={gltf}
          jsonPath={jsonPath}
          listeners={listeners}
          setHovered={setHovered}
        />
      ))}
    </>
  );
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