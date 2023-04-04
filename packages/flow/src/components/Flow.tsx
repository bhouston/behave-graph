import { FC } from "react";
import ReactFlow, {
  Background,
  BackgroundVariant,
} from "reactflow";
import { GraphJSON } from "@behave-graph/core";
import CustomControls from "./Controls";
import { NodePicker } from "./NodePicker";
import { useCoreRegistry } from "../hooks/useCoreRegistry";
import { useNodeSpecJson } from "../hooks/useNodeSpecJson";
import { useBehaveGraphFlow } from "../hooks/useBehaveGraphFlow";
import { useGraphRunner } from "../hooks/useGraphRunner";
import { useFlowHandlers } from "../hooks/useFlowHandlers";
import { Examples } from "./modals/LoadModal";

type FlowProps = {
  initialGraph: GraphJSON;
  examples: Examples;
}

export const Flow: FC<FlowProps> = ({ initialGraph: graph, examples }) => {
  const { nodeDefinitions, valuesDefinitions, dependencies: dependencies } = useCoreRegistry();

  const specJson = useNodeSpecJson({ nodes: nodeDefinitions, values: valuesDefinitions, dependencies });

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

  const { onConnect, handleStartConnect, handleStopConnect, handlePaneClick, handlePaneContextMenu, nodePickerVisibility, handleAddNode, lastConnectStart, closeNodePicker, nodePickFilters } = useFlowHandlers({
    nodes,
    onEdgesChange,
    onNodesChange,
    specJSON: specJson
  })

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
      <CustomControls playing={playing} togglePlay={togglePlay} setBehaviorGraph={setGraphJson} examples={examples} specJson={specJson} />
      <Background
        variant={BackgroundVariant.Lines}

        color="#2a2b2d"
        style={{ backgroundColor: "#1E1F22" }}
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
}


