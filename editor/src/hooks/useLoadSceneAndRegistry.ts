import { useState } from 'react';
import { useGLTF } from '@react-three/drei';
import useSceneModifier, { OnClickListener } from '../scene/useSceneModifier';
import { useRegistry } from './behaviorFlow';

const useLoadSceneAndRegistry = ({ modelUrl }: { modelUrl: string }) => {
  const sceneJson = useGLTF(modelUrl);

  const [sceneOnClickListeners, setSceneOnClickListeners] = useState<OnClickListener[]>([]);

  const scene = useSceneModifier(sceneJson, setSceneOnClickListeners);

  const { registry, specJson, lifecyleEmitter } = useRegistry({ scene });

  return {
    sceneJson,
    scene,
    sceneOnClickListeners,
    registry,
    specJson,
    lifecyleEmitter,
  };
};

export default useLoadSceneAndRegistry;
