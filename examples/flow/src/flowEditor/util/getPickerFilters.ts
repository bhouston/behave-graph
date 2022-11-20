import { Node, OnConnectStartParams } from 'reactflow';
import { NodePickerFilters } from '../components/NodePicker';
import { getSocketsByNodeTypeAndHandleType } from './getSocketsByNodeTypeAndHandleType';
import { NodeSpecJSON } from '@behave-graph/core';

export const getNodePickerFilters = (
  nodes: Node[],
  params: OnConnectStartParams | undefined,
  specJSON: NodeSpecJSON[]
): NodePickerFilters | undefined => {
  if (params === undefined) return;

  const originNode = nodes.find((node) => node.id === params.nodeId);
  if (originNode === undefined) return;

  const sockets = getSocketsByNodeTypeAndHandleType(specJSON, originNode.type, params.handleType);

  const socket = sockets?.find((socket) => socket.name === params.handleId);

  if (socket === undefined) return;

  return {
    handleType: params.handleType === 'source' ? 'target' : 'source',
    valueType: socket.valueType,
  };
};
