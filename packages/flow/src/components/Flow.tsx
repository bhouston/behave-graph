import { GraphJSON } from '@behave-graph/core';
import React from 'react';
import { Background, BackgroundVariant, ReactFlow } from 'reactflow';

import { useBehaveGraphFlow } from '../hooks/useBehaveGraphFlow.js';
import { useCoreRegistry } from '../hooks/useCoreRegistry.js';
import { useSceneRegistry } from '../hooks/useSceneRegistry.js';
import { useFlowHandlers } from '../hooks/useFlowHandlers.js';
import { useGraphRunner } from '../hooks/useGraphRunner.js';
import { useNodeSpecJson } from '../hooks/useNodeSpecJson.js';
import CustomControls from './Controls.js';
import { Examples } from './modals/LoadModal.js';
import { NodePicker } from './NodePicker.js';

type FlowProps = {
  initialGraph: GraphJSON;
  examples: Examples;
};

export const Flow: React.FC<FlowProps> = ({
  initialGraph: graph,
  examples
}) => {
  const {
    nodeDefinitions: nodeDefinitionsCore,
    valuesDefinitions: valuesDefinitionsCore,
    dependencies: dependenciesCore
  } = useCoreRegistry();
  const {
    nodeDefinitions: nodeDefinitionsScene,
    valuesDefinitions: valuesDefinitionsScene,
    dependencies: dependenciesScene
  } = useSceneRegistry();
  const nodeDefinitions = { ...nodeDefinitionsCore, ...nodeDefinitionsScene };
  const valuesDefinitions = {
    ...valuesDefinitionsCore,
    ...valuesDefinitionsScene
  };
  const dependencies = { ...dependenciesCore, ...dependenciesScene };
  const specJson = useNodeSpecJson({
    nodes: nodeDefinitions,
    values: valuesDefinitions,
    dependencies
  });

  const {
    nodes,
    edges,
    onNodesChange,
    onEdgesChange,
    graphJson,
    setGraphJson,
    nodeTypes
  } = useBehaveGraphFlow({
    initialGraphJson: graph,
    specJson
  });

  const {
    onConnect,
    handleStartConnect,
    handleStopConnect,
    handlePaneClick,
    handlePaneContextMenu,
    nodePickerVisibility,
    handleAddNode,
    lastConnectStart,
    closeNodePicker,
    nodePickFilters
  } = useFlowHandlers({
    nodes,
    onEdgesChange,
    onNodesChange,
    specJSON: specJson
  });

  const { togglePlay, playing } = useGraphRunner({
    graphJson,
    valueTypeDefinitions: valuesDefinitions,
    nodeDefinitions,
    eventEmitter: dependencies.lifecycleEventEmitter,
    dependencies
  });

  return (
    <ReactFlow
      nodeTypes={nodeTypes}
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      // @ts-ignore
      onConnectStart={handleStartConnect}
      // @ts-ignore
      onConnectEnd={handleStopConnect}
      fitView
      fitViewOptions={{ maxZoom: 1 }}
      onPaneClick={handlePaneClick}
      onPaneContextMenu={handlePaneContextMenu}
    >
      <CustomControls
        playing={playing}
        togglePlay={togglePlay}
        setBehaviorGraph={setGraphJson}
        examples={examples}
        specJson={specJson}
      />
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
};
