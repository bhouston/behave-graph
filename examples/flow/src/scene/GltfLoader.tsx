import { useEffect } from 'react';
import { useGLTF } from '@react-three/drei';
import { ObjectMap } from '@react-three/fiber';
import { GLTF } from 'three-stdlib';

const GltfLoaderInner = ({ fileUrl, setGltf }: { fileUrl: string; setGltf: (gltf: GLTF & ObjectMap) => void }) => {
  const gltf = useGLTF(fileUrl);

  useEffect(() => {
    setGltf(gltf);
  }, [gltf, setGltf]);

  return null;
};

// allows us to have a null for file url and still call useGltf
const GltfLoader = ({
  fileUrl,
  setGltf,
}: {
  fileUrl: string | undefined;
  setGltf: (gltf: (GLTF & ObjectMap) | undefined) => void;
}) => {
  useEffect(() => {
    if (!fileUrl) setGltf(undefined);
  }, [fileUrl, setGltf]);
  if (!fileUrl) return null;

  return <GltfLoaderInner fileUrl={fileUrl} setGltf={setGltf} />;
};

export default GltfLoader;
