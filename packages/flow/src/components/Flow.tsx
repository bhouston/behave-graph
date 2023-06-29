import { GraphJSON } from '@behave-graph/core';
import {
  FC,
  MouseEvent as ReactMouseEvent,
  TouchEvent as ReactTouchEvent,
  useCallback,
  useMemo,
  useState
} from 'react';
import ReactFlow, {
  Background,
  BackgroundVariant,
  Connection,
  OnConnectStartParams,
  useEdgesState,
  useNodesState,
  XYPosition
} from 'reactflow';
import { v4 as uuidv4 } from 'uuid';

import { useNodeSpecJson } from '../hooks/useNodeSpecJson.js';
import { useRegistry } from '../hooks/useRegistry.js';
import { behaveToFlow } from '../transformers/behaveToFlow.js';
import { calculateNewEdge } from '../util/calculateNewEdge.js';
import { customNodeTypes } from '../util/customNodeTypes.js';
import { getNodePickerFilters } from '../util/getPickerFilters.js';
import CustomControls from './Controls.js';
import { Examples } from './modals/LoadModal.js';
import NodePicker from './NodePicker.js';

type FlowProps = {
  graph: GraphJSON;
  examples: Examples;
};

export const Flow: FC<FlowProps> = ({ graph, examples }) => {
  const [nodePickerVisibility, setNodePickerVisibility] =
    useState<XYPosition>();
  const [lastConnectStart, setLastConnectStart] =
    useState<OnConnectStartParams>();

  const [initialNodes, initialEdges] = useMemo(
    () => behaveToFlow(graph),
    [graph]
  );

  const [nodes, , onNodesChange] = useNodesState(initialNodes);
  const [edges, , onEdgesChange] = useEdgesState(initialEdges);

  const { registry, logger, manualLifecycleEventEmitter } = useRegistry();
  const nodeSpecJson = useNodeSpecJson({ registry });

  const onConnect = useCallback(
    (connection: Connection) => {
      if (connection.source === null) return;
      if (connection.target === null) return;

      const newEdge = {
        id: uuidv4(),
        source: connection.source,
        target: connection.target,
        sourceHandle: connection.sourceHandle,
        targetHandle: connection.targetHandle
      };
      onEdgesChange([
        {
          type: 'add',
          item: newEdge
        }
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
        data: {}
      };
      onNodesChange([
        {
          type: 'add',
          item: newNode
        }
      ]);

      if (lastConnectStart === undefined) return;

      // add an edge if we started on a socket
      const originNode = nodes.find(
        (node) => node.id === lastConnectStart.nodeId
      );
      if (originNode === undefined) return;
      onEdgesChange([
        {
          type: 'add',
          item: calculateNewEdge(
            originNode,
            nodeType,
            newNode.id,
            lastConnectStart
          )
        }
      ]);
    },
    [lastConnectStart, nodes, onEdgesChange, onNodesChange]
  );

  const handleStartConnect = (
    e: ReactMouseEvent | ReactTouchEvent,
    params: OnConnectStartParams
  ) => {
    setLastConnectStart(params);
  };

  const handleStopConnect = (e: MouseEvent | TouchEvent) => {
    const element = e.target as HTMLElement;
    if (
      element.classList.contains('react-flow__pane') &&
      e instanceof MouseEvent
    ) {
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
      <CustomControls
        examples={examples}
        manualLifecycleEventEmitter={manualLifecycleEventEmitter}
        registry={registry}
      />
      <Background
        variant={BackgroundVariant.Lines}
        color="#2a2b2d"
        style={{ backgroundColor: '#1E1F22' }}
      />
      {nodePickerVisibility && (
        <NodePicker
          position={nodePickerVisibility}
          filters={getNodePickerFilters(nodes, lastConnectStart)}
          onPickNode={handleAddNode}
          onClose={closeNodePicker}
          specJSON={nodeSpecJson}
        />
      )}
    </ReactFlow>
  );
};
