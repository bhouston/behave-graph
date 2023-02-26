import { Suspense, useState } from 'react';
import { Scene } from './scene/Scene';
import './styles/resizer.css';
import { CustomControls } from './components/CustomControls';
import useSetAndLoadModelFile, {
  exampleModelFileUrl
} from './hooks/useSetAndLoadModelFile';
import SplitEditor from './SplitEditor';
import { examplePairs } from './components/LoadModal';
import {
  createSceneDependency,
} from '@behave-graph/scene';

import { useScene } from './scene/useScene';
import {
  useBehaveGraphFlow,
  useGraphRunner,
  useNodeSpecJson,
  NodePicker,
  useFlowHandlers,
  useCustomNodeTypes,
  useMergeDependencies,
  useDependency,
  useCoreRegistry
} from '@behave-graph/flow';
import { suspend } from 'suspend-react';
import {
  exampleBehaveGraphFileUrl,
  fetchBehaviorGraphJson
} from './hooks/useSaveAndLoad';
import ReactFlow, { Background, BackgroundVariant } from 'reactflow';
import { useEffect } from 'react';
import { useSceneRegistry } from './hooks/useSceneRegistry';

const [initialModelFile, initialBehaviorGraph] = examplePairs[0];

const initialModelFileUrl = exampleModelFileUrl(initialModelFile);
const initialBehaviorGraphUrl = exampleBehaveGraphFileUrl(initialBehaviorGraph);

export function Flow() {
  const { setModelFile, gltf } = useSetAndLoadModelFile({
    initialFileUrl: initialModelFileUrl
  });

  const { nodeDefinitions: coreNodeDefinitions, valuesDefinitions: coreValueDefinitions, dependencies: coreDependencies } = useCoreRegistry();

  const { nodeDefinitions, valuesDefinitions } = useSceneRegistry({
    existingNodeDefinitions: coreNodeDefinitions,
    existingValuesDefinitions: coreValueDefinitions
  })

  const { scene, animations, sceneOnClickListeners } = useScene(gltf);

  const sceneDependency = useDependency(scene, createSceneDependency);
  const dependencies = useMergeDependencies(coreDependencies, sceneDependency);

  const specJson = useNodeSpecJson({
    dependencies,
    nodes: nodeDefinitions,
    values: valuesDefinitions
  });

  const initialGraphJson = suspend(async () => {
    return await fetchBehaviorGraphJson(initialBehaviorGraphUrl);
  }, []);

  const {
    nodes,
    edges,
    onNodesChange,
    onEdgesChange,
    graphJson,
    setGraphJson
  } = useBehaveGraphFlow({
    initialGraphJson,
    specJson
  });
  
  const { togglePlay, playing } = useGraphRunner({
    graphJson,
    valueTypeDefinitions: coreValueDefinitions,
    eventEmitter: coreDependencies.lifecycleEventEmitter,
    dependencies,
    nodeDefinitions
  });

  const {
    onConnect,
    handleStartConnect,
    handleStopConnect,
    handlePaneClick,
    handlePaneContextMenu,
    nodePickerVisibility,
    handleAddNode,
    closeNodePicker,
    nodePickFilters
  } = useFlowHandlers({
    nodes,
    onEdgesChange,
    onNodesChange,
    specJSON: specJson
  });

  const customNodeTypes = useCustomNodeTypes({
    specJson
  });

  const [refreshFlow, setRefreshFlow] = useState(false);

  useEffect(() => {
    setRefreshFlow(true);
    setTimeout(() => setRefreshFlow(false));
  }, [customNodeTypes])

  const flowEditor = (customNodeTypes && !refreshFlow) && (
    <ReactFlow
      nodeTypes={customNodeTypes}
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      onConnectStart={handleStartConnect}
      onConnectEnd={handleStopConnect}
      fitView
      fitViewOptions={{ maxZoom: 1 }}
      onPaneClick={handlePaneClick}
      onPaneContextMenu={handlePaneContextMenu}
    >
      {specJson && (
      <CustomControls
        toggleRun={togglePlay}
        graphJson={graphJson}
        running={playing}
        setBehaviorGraph={setGraphJson}
        setModelFile={setModelFile}
      />)}
      <Background
        variant={BackgroundVariant.Lines}
        color="#2a2b2d"
        style={{ backgroundColor: '#1E1F22' }}
      />
      {nodePickerVisibility && (
        <NodePicker
          position={nodePickerVisibility}
          filters={nodePickFilters}
          onPickNode={handleAddNode}
          onClose={closeNodePicker}
          specJSON={specJson}
        />
      )}
    </ReactFlow>
  );

  const interactiveModelPreview = gltf && (
    <Scene
      gltf={gltf}
      onClickListeners={sceneOnClickListeners}
      animationsState={animations}
    />
  );

  return (
    <>
      <div className="w-full h-full relative">
        <SplitEditor left={flowEditor || <></>} right={interactiveModelPreview} />
      </div>
    </>
  );
}

export function FlowWrapper() {
  return (
    <Suspense fallback={null}>
      <Flow  />
    </Suspense>
  );
}
