import { useState, useEffect } from 'react';
import { dataUrlFromFile } from '../hooks/useSaveAndLoad';
import { useGLTF } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stage, useCursor } from '@react-three/drei';
import { Object3D } from 'three';

const ModelPreviewInner = ({ fileUrl }: { fileUrl: string }) => {
  const gltf = useGLTF(fileUrl);

  const [mainRef, setMainRef] = useState<Object3D | null>(null);

  return (
    <Canvas>
      <OrbitControls makeDefault target={mainRef?.position} />
      <Stage shadows adjustCamera={false} intensity={1} environment="city" preset="rembrandt">
        <primitive object={gltf.scene} ref={setMainRef} />
      </Stage>
    </Canvas>
  );
};

const ModelPreview = ({ file }: { file: File }) => {
  const [fileDataUrl, setFileDataUrl] = useState<string>();

  useEffect(() => {
    (async () => {
      setFileDataUrl(await dataUrlFromFile(file));
    })();
  }, [file]);

  if (!fileDataUrl) return null;

  return <ModelPreviewInner fileUrl={fileDataUrl} />;
};

export default ModelPreview;
