import { MouseEvent as ReactMouseEvent, useCallback, useMemo, useState } from 'react';
import ReactFlow, {
  Background,
  BackgroundVariant,
  Connection,
  OnConnectStartParams,
  OnNodesChange,
  OnEdgesChange,
  XYPosition,
  Node,
  Edge,
} from 'reactflow';
import { v4 as uuidv4 } from 'uuid';
import Controls from './components/Controls';
import NodePicker from './components/NodePicker';
import { calculateNewEdge } from './util/calculateNewEdge';
import { IScene, NodeSpecJSON, Registry } from '@behavior-graph/framework';
import 'reactflow/dist/style.css';
import './flowEditor.css';
import useFlowConfigFromRegistry from './hooks/useFlowConfigFromRegistry';

function Flow({
  toggleRun,
  running,
  registry,
  nodes,
  onNodesChange,
  edges,
  onEdgesChange,
  specJson,
  scene,
}: {
  toggleRun: () => void;
  running: boolean;
  registry: Registry | undefined;
  nodes: Node<any>[];
  onNodesChange: OnNodesChange;
  edges: Edge<any>[];
  onEdgesChange: OnEdgesChange;
  specJson: NodeSpecJSON[];
  scene: IScene;
}) {
  const [nodePickerVisibility, setNodePickerVisibility] = useState<XYPosition>();
  const [lastConnectStart, setLastConnectStart] = useState<OnConnectStartParams>();

  const { filters, customNodeTypes } = useFlowConfigFromRegistry({
    registry,
    nodes,
    lastConnectStart,
    specJson,
    scene,
  });

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
          type: 'add',
          item: newEdge,
        },
      ]);
    },
    [onEdgesChange]
  );

  const handleAddNode = useCallback(
    (nodeType: string, position: XYPosition) => {
      if (!specJson) return;
      closeNodePicker();
      const newNode = {
        id: uuidv4(),
        type: nodeType,
        position,
        data: {},
      };
      onNodesChange([
        {
          type: 'add',
          item: newNode,
        },
      ]);

      if (lastConnectStart === undefined) return;

      // add an edge if we started on a socket
      const originNode = nodes.find((node) => node.id === lastConnectStart.nodeId);
      if (originNode === undefined) return;
      onEdgesChange([
        {
          type: 'add',
          item: calculateNewEdge(originNode, nodeType, newNode.id, lastConnectStart, specJson),
        },
      ]);
    },
    [lastConnectStart, nodes, onEdgesChange, onNodesChange, specJson]
  );

  const handleStartConnect = (e: ReactMouseEvent, params: OnConnectStartParams) => {
    setLastConnectStart(params);
  };

  const handleStopConnect = (e: MouseEvent) => {
    const element = e.target as HTMLElement;
    if (element.classList.contains('react-flow__pane')) {
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

  if (!customNodeTypes || !specJson) return null;

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
      <Controls toggleRun={toggleRun} specJson={specJson} running={running} />
      <Background variant={BackgroundVariant.Lines} color="#2a2b2d" style={{ backgroundColor: '#1E1F22' }} />
      {nodePickerVisibility && (
        <NodePicker
          position={nodePickerVisibility}
          filters={filters}
          onPickNode={handleAddNode}
          onClose={closeNodePicker}
        />
      )}
    </ReactFlow>
  );
}

export default Flow;
