import { Node, OnConnectStartParams } from 'reactflow';
import { v4 as uuidv4 } from 'uuid';

import { getSocketsByNodeTypeAndHandleType } from './getSocketsByNodeTypeAndHandleType.js';
import { NodeSpecGenerator } from '../hooks/useNodeSpecGenerator.js';

export const calculateNewEdge = (
  originNode: Node,
  destinationNodeType: string,
  destinationNodeId: string,
  connection: OnConnectStartParams,
  specGenerator: NodeSpecGenerator,
) => {
  const sockets = getSocketsByNodeTypeAndHandleType(
    specGenerator,
    originNode.type,
    originNode.data.configuration,
    connection.handleType
  );
  const originSocket = sockets?.find(
    (socket) => socket.name === connection.handleId
  );

  const newSockets = getSocketsByNodeTypeAndHandleType(
    specGenerator,
    destinationNodeType,
    {},
    connection.handleType === 'source' ? 'target' : 'source'
  );
  const newSocket = newSockets?.find(
    (socket) => socket.valueType === originSocket?.valueType
  );

  if (connection.handleType === 'source') {
    return {
      id: uuidv4(),
      source: connection.nodeId ?? '',
      sourceHandle: connection.handleId,
      target: destinationNodeId,
      targetHandle: newSocket?.name
    };
  }

  return {
    id: uuidv4(),
    target: connection.nodeId ?? '',
    targetHandle: connection.handleId,
    source: destinationNodeId,
    sourceHandle: newSocket?.name
  };
};
