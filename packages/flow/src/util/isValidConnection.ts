import { NodeSpecJSON } from '@behave-graph/core';
import { Connection, ReactFlowInstance } from 'reactflow';

import { getSocketsByNodeTypeAndHandleType } from './getSocketsByNodeTypeAndHandleType.js';
import { isHandleConnected } from './isHandleConnected.js';
import { NodeSpecGenerator } from '../hooks/useNodeSpecGenerator.js';

export const isValidConnection = (
  connection: Connection,
  instance: ReactFlowInstance,
  specGenerator: NodeSpecGenerator,
) => {
  if (connection.source === null || connection.target === null) return false;

  const sourceNode = instance.getNode(connection.source);
  const targetNode = instance.getNode(connection.target);
  const edges = instance.getEdges();

  if (sourceNode === undefined || targetNode === undefined) return false;

  const sourceSockets = getSocketsByNodeTypeAndHandleType(
    specGenerator,
    sourceNode.type,
    sourceNode.data.configuration,
    'source',
  );

  const sourceSocket = sourceSockets?.find(
    (socket) => socket.name === connection.sourceHandle
  );

  const targetSockets = getSocketsByNodeTypeAndHandleType(
    specGenerator,
    targetNode.type,
    targetNode.data.configuration,
    'target',
  );

  const targetSocket = targetSockets?.find(
    (socket) => socket.name === connection.targetHandle
  );

  if (sourceSocket === undefined || targetSocket === undefined) return false;

  // only flow sockets can have two inputs
  if (
    targetSocket.valueType !== 'flow' &&
    isHandleConnected(edges, targetNode.id, targetSocket.name, 'target')
  ) {
    return false;
  }

  return sourceSocket.valueType === targetSocket.valueType;
};
