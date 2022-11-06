import { useState } from 'react';
import { useGLTF } from '@react-three/drei';
import useSceneModifier, { OnClickListener } from '../scene/useSceneModifier';
import { useRegistry } from './behaviorFlow';
import { ISmartContractActions } from '@behavior-graph/framework/src/lib/Profiles/Scene/Abstractions/ISmartContractAction';

const useLoadSceneAndRegistry = ({
  modelUrl,
  smartContractActions,
}: {
  modelUrl: string;
  smartContractActions?: ISmartContractActions;
}) => {
  const sceneJson = useGLTF(modelUrl);

  const [sceneOnClickListeners, setSceneOnClickListeners] = useState<OnClickListener[]>([]);

  const scene = useSceneModifier(sceneJson, setSceneOnClickListeners);

  const { registry, specJson, lifecyleEmitter } = useRegistry({ scene, smartContractActions });

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
