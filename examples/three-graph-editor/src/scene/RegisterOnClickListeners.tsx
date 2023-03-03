import { OnClickListener, OnClickListeners } from '@oveddan-behave-graph/scene'
import { GLTF } from 'three-stdlib';
import { ObjectMap } from '@react-three/fiber';
import { useCallback, useEffect, useState } from 'react';
import { Mesh } from 'three';
import { useCursor } from '@react-three/drei';

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

export const RegisterOnClickListeners = ({ onClickListeners, gltf }: {onClickListeners: OnClickListeners, gltf?: GLTF & ObjectMap;}) => {
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