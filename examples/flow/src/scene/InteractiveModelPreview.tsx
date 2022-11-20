import { useEffect, useState } from 'react';
import { GraphJSON } from '@behave-graph/core';
import { useGLTF } from '@react-three/drei';
import Scene from './Scene';
import { dataUrlFromFile } from '../hooks/useBehaveGraphFlow';
import { useEngine } from '../hooks/useEngine';
import useSceneModifier from './useSceneModifier';
import { useRegistry } from '../hooks/useRegistry';

const Inner = ({ fileDataUrl, graphJson }: { fileDataUrl: string; graphJson: GraphJSON }) => {
  const gltf = useGLTF(fileDataUrl);

  const { animations, sceneOnClickListeners, registerSceneProfile } = useSceneModifier(gltf);

  const { lifecyleEmitter, registry } = useRegistry({
    registerProfiles: registerSceneProfile
  });

  useEngine({
    graphJson,
    registry,
    eventEmitter: lifecyleEmitter,
    autoRun: true
  });

  return <Scene gltf={gltf} onClickListeners={sceneOnClickListeners} animationsState={animations} />;
};

const InteractiveModelPreview = ({ file, graphJson }: { file: File; graphJson: GraphJSON }) => {
  const [fileDataUrl, setFileDataUrl] = useState<string>();

  useEffect(() => {
    (async () => {
      setFileDataUrl(await dataUrlFromFile(file));
    })();
  }, [file]);

  if (!fileDataUrl) return null;

  return <Inner fileDataUrl={fileDataUrl} graphJson={graphJson} />;
};

export default InteractiveModelPreview;
