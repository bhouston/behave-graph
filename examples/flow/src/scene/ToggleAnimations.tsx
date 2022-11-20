import { useEffect, useState } from 'react';
import { useAnimations } from '@react-three/drei';
import { AnimationAction } from 'three';
import { ObjectMap } from '@react-three/fiber';
import { GLTF } from 'three-stdlib';
import { AnimationsState } from './useSceneModifier';

type AnimationActions = {
  [key: string]: AnimationAction | null;
};

const PlayAnimation = ({ name, actions, playing }: { name: string; actions: AnimationActions; playing: boolean }) => {
  const [action] = useState(actions[name]);

  useEffect(() => {
    if (!action) return;
    // reset animation state on mount
    action.reset();

    // on unmount, stop the animation
    return () => {
      if (!action.paused) action.stop();
    };
  }, [action]);

  useEffect(() => {
    if (playing) {
      if (!action) {
        console.error('invalid action name', name, 'had actions:', actions);
        return;
      }

      if (action.paused) action.paused = false;
      else action.play();

      // on stop playing, pause the action
      return () => {
        action.paused = true;
      };
    }
  }, [name, actions, action, playing]);

  return null;
};

const ToggleAnimations = ({ gltf, animationsState }: { gltf: GLTF & ObjectMap; animationsState: AnimationsState }) => {
  const { actions: animationActions } = useAnimations(gltf.animations, gltf.scene);

  return (
    <>
      {Object.entries(animationsState).map(([name, playing]) => (
        <PlayAnimation key={name} playing={playing} name={name} actions={animationActions as AnimationActions} />
      ))}
    </>
  );
};

export default ToggleAnimations;
