import { useGLTF } from '@react-three/drei';
import { Suspense, useCallback, useState } from 'react';
import FlowEditor from './flowEditor/FlowEditorApp';
import { useRegistry } from './hooks/behaviorFlow';
import Scene from './scene/Scene';
import useSceneModifier from './scene/useSceneModifier';

function EditorAndScene({ modelUrl }: { modelUrl: string }) {
  const sceneJson = useGLTF(modelUrl);

  const scene = useSceneModifier(sceneJson);

  const registry = useRegistry({ scene });

  const handleRun = useCallback(() => {
    console.log('hi');
  }, []);

  return (
    <div className="h-full grid grid-cols-2 gap-0">
      <div className="bg-lime-500 h-full">
        <FlowEditor scene={scene} handleRun={handleRun} registry={registry} />
      </div>
      <div className="bg-red-400 h-full">
        <Scene scene={sceneJson} />
      </div>
    </div>
  );
}

function App() {
  const [modelUrl] = useState('/FlashSuzanne.gltf');

  return (
    <Suspense fallback={null}>
      <EditorAndScene modelUrl={modelUrl} />
    </Suspense>
  );
}

export default App;
