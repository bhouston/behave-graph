import { Stage } from '@react-three/drei';
import { Canvas, ObjectMap } from '@react-three/fiber';
import { GLTF } from 'three/examples/jsm/loaders/GLTFLoader';

const Scene = ({ scene }: { scene: GLTF & ObjectMap }) => {
  return (
    <Canvas className="w-full h-full">
      <Stage>
        <primitive object={scene.scene} />
      </Stage>
    </Canvas>
  );
};

export default Scene;
