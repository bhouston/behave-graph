import { FC, MouseEvent as ReactMouseEvent, useCallback, useMemo, useState } from "react";
import ReactFlow, {
  Background,
  BackgroundVariant,
  Connection,
  OnConnectStartParams,
  useEdgesState,
  useNodesState,
  XYPosition,
} from "reactflow";
import { v4 as uuidv4 } from "uuid";
import { GraphJSON } from "@behave-graph/core";
import { behaveToFlow } from "../transformers/behaveToFlow";
import { calculateNewEdge } from "../util/calculateNewEdge";
import { customNodeTypes } from "../util/customNodeTypes";
import CustomControls from "./Controls";
import NodePicker from "./NodePicker";
import { getNodePickerFilters } from "../util/getPickerFilters";

type FlowProps = {
  graph: GraphJSON
}

export const Flow: FC<FlowProps> = ({ graph }) => {
  const [nodePickerVisibility, setNodePickerVisibility] =
    useState<XYPosition>();
  const [lastConnectStart, setLastConnectStart] =
    useState<OnConnectStartParams>();

  const [initialNodes, initialEdges] = useMemo(() => behaveToFlow(graph), [graph]);

  const [nodes, , onNodesChange] = useNodesState(initialNodes);
  const [edges, , onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback(
    (connection: Connection) => {
      if (connection.source === null) return;
      if (connection.target === null) return;

      const newEdge = {
        id: uuidv4(),
        source: connection.source,
        target: connection.target,
        sourceHandle: connection.sourceHandle,
        targetHandle: connection.targetHandle,
      };
      onEdgesChange([
        {
          type: "add",
          item: newEdge,
        },
      ]);
    },
    [onEdgesChange]
  );

  const handleAddNode = useCallback(
    (nodeType: string, position: XYPosition) => {
      closeNodePicker();
      const newNode = {
        id: uuidv4(),
        type: nodeType,
        position,
        data: {},
      };
      onNodesChange([
        {
          type: "add",
          item: newNode,
        },
      ]);

      if (lastConnectStart === undefined) return;

      // add an edge if we started on a socket
      const originNode = nodes.find(
        (node) => node.id === lastConnectStart.nodeId
      );
      if (originNode === undefined) return;
      onEdgesChange([
        {
          type: "add",
          item: calculateNewEdge(
            originNode,
            nodeType,
            newNode.id,
            lastConnectStart
          ),
        },
      ]);
    },
    [lastConnectStart, nodes, onEdgesChange, onNodesChange]
  );

  const handleStartConnect = (
    e: ReactMouseEvent,
    params: OnConnectStartParams
  ) => {
    setLastConnectStart(params);
  };

  const handleStopConnect = (e: MouseEvent) => {
    const element = e.target as HTMLElement;
    if (element.classList.contains("react-flow__pane")) {
      setNodePickerVisibility({ x: e.clientX, y: e.clientY });
    } else {
      setLastConnectStart(undefined);
    }
  };

  const closeNodePicker = () => {
    setLastConnectStart(undefined);
    setNodePickerVisibility(undefined);
  };

  const handlePaneClick = () => closeNodePicker();

  const handlePaneContextMenu = (e: ReactMouseEvent) => {
    e.preventDefault();
    setNodePickerVisibility({ x: e.clientX, y: e.clientY });
  };

  return (
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
      <CustomControls />
      <Background
        variant={BackgroundVariant.Lines}
        color="#2a2b2d"
        style={{ backgroundColor: "#1E1F22" }}
      />
      {nodePickerVisibility && (
        <NodePicker
          position={nodePickerVisibility}
          filters={getNodePickerFilters(nodes, lastConnectStart)}
          onPickNode={handleAddNode}
          onClose={closeNodePicker}
        />
      )}
    </ReactFlow>
  );
}
