import { useEffect, useState } from 'react';
import { useAnimations } from '@react-three/drei';
import { ACESFilmicToneMapping, AnimationAction } from 'three';
import { ObjectMap } from '@react-three/fiber';
import { GLTF } from 'three-stdlib';
import { AnimationsState } from './useScene';
import { faRub } from '@fortawesome/free-solid-svg-icons';

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

  const [hasPlayed, setHasPlayed] = useState(false);

  useEffect(() => {
    if (!action) {
      console.error('invalid action name', name, 'had actions:', actions);
      return;
    }
    if (playing) {
      if (!hasPlayed) {
        console.log('playing for the first time');
        action.play();
        setHasPlayed(true);
      } else {
        if (action.paused) {
          console.log('unpausing');
          action.paused = false;
        }
      }
    } else {
      if (!hasPlayed) return;
      if (!action) {
        console.error('invalid action name', name, 'had actions:', actions);
        return;
      }

      console.log('pausing');
      action.paused = true;
    }
  }, [name, actions, action, playing, hasPlayed]);

  return null;
};

const ToggleAnimations = ({ gltf, animationsState }: { gltf: GLTF & ObjectMap; animationsState: AnimationsState }) => {
  const { actions: animationActions } = useAnimations(gltf.animations, gltf.scene);

  return (
    <>
      {Object.entries(animationsState).map(([name, playing]) => (
        <PlayAnimation key={name} playing={playing} name={name} actions={animationActions} />
      ))}
    </>
  );
};

export default ToggleAnimations;
