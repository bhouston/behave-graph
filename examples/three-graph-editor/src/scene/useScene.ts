import { buildScene, IScene, OnClickListeners } from '@behave-graph/scene';
import { ObjectMap } from '@react-three/fiber';
import { useCallback, useEffect, useState } from 'react';
import { GLTF } from 'three-stdlib';

export type AnimationsState = { [key: string]: boolean };

export const useScene = (gltf: (GLTF & ObjectMap) | undefined) => {
  const [scene, setScene] = useState<IScene>();

  const [activeAnimations, setActiveAnimations] = useState<AnimationsState>({});
  const [sceneOnClickListeners, setSceneOnClickListeners] =
    useState<OnClickListeners>({});

  useEffect(() => {
    // reset state on new active animations
    setActiveAnimations({});
  }, [gltf]);

  const setAnimationActive = useCallback(
    (animation: string, active: boolean) => {
      setActiveAnimations((existing) => {
        if (!!existing[animation] === active) return existing;

        return {
          ...existing,
          [animation]: active
        };
      });
    },
    []
  );

  useEffect(() => {
    if (!gltf) {
      setScene(undefined);
    } else {
      setScene(
        buildScene({
          gltf,
          setOnClickListeners: setSceneOnClickListeners,
          setActiveAnimations: setAnimationActive
        })
      );
    }
  }, [gltf, setSceneOnClickListeners, setAnimationActive]);

  return {
    scene,
    animations: activeAnimations,
    sceneOnClickListeners
  };
};
