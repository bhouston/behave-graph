import { Suspense } from 'react';
import FlowEditor from './flowEditor/FlowEditor';
import { useRegistry } from './hooks/useRegistry';
import Scene from './scene/Scene';
import Controls from './flowEditor/components/Controls';
import useBehaveGraphFlow from './hooks/useBehaveGraphFlow';
import GltfLoader from './scene/GltfLoader';

import '@rainbow-me/rainbowkit/styles.css';
import './styles/resizer.css';
import useSetAndLoadModelFile from './hooks/useSetAndLoadModelFile';
import useSceneModifier from './scene/useSceneModifier';
import useNodeSpecJson from './hooks/useNodeSpecJson';
import { useEngine } from './hooks/useEngine';
import SplitEditor from './flowEditor/components/SplitEditor';

function App() {

  const { modelFile, setModelFile, gltf, setGltf  } = useSetAndLoadModelFile();

  const { scene, animations, sceneOnClickListeners, registerSceneProfile } = useSceneModifier(gltf);

  const { registry, lifecyleEmitter } = useRegistry({
    registerProfiles: registerSceneProfile
  });

  const specJson = useNodeSpecJson(registry);

  const { nodes, edges, onNodesChange, onEdgesChange, graphJson, setGraphJson: handleGraphJsonLoaded } = useBehaveGraphFlow(specJson);

  const { togglePlay, playing} = useEngine({
    graphJson,
    registry,
    eventEmitter: lifecyleEmitter,
  });

  const controls = specJson && (
    <Controls
      toggleRun={togglePlay}
      graphJson={graphJson}
      running={playing}
      setModelFile={setModelFile}
      handleGraphJsonLoaded={handleGraphJsonLoaded}
    />
  );

  const flowEditor = controls && scene && (
    <FlowEditor
        nodes={nodes}
        onNodesChange={onNodesChange}
        edges={edges}
        onEdgesChange={onEdgesChange}
        specJson={specJson}
        scene={scene}
        controls={controls}
      />
    )

  const interactiveModelPreview = modelFile && <Scene gltf={gltf} onClickListeners={sceneOnClickListeners} animationsState={animations} />

  if (interactiveModelPreview) 
    return (
        <>
          <div className="w-full h-full relative" >
            <SplitEditor 
              left={flowEditor}   
              right={interactiveModelPreview}
            />
          </div>
          {/* @ts-ignore */}
          <GltfLoader fileUrl={modelFile?.dataUri} setGltf={setGltf} />
      </>
    );

  return (
    <>
      <div className="w-full h-full relative">
         {flowEditor}
      </div>
    </>
  )
}

function AppWrapper() {
  return (
    <Suspense fallback={null}>
      <App />
    </Suspense>
  );
}

export default AppWrapper;
