import { NodeSpecJSON } from '@behave-graph/core';
import { useEffect, useState } from 'react';
import { Node, NodeTypes, OnConnectStartParams } from 'reactflow';

import { ISceneWithQueries } from '../../abstractions';
import { NodePickerFilters } from '../components/NodePicker';
import getCustomNodeTypes from '../util/getCustomNodeTypes';
import { getNodePickerFilters } from '../util/getPickerFilters';

const useFlowConfigFromRegistry = ({
  nodes,
  lastConnectStart,
  specJson,
  scene
}: {
  nodes: Node<any>[];
  lastConnectStart: OnConnectStartParams | undefined;
  specJson: NodeSpecJSON[];
  scene: ISceneWithQueries;
}) => {
  const [filters, setFilters] = useState<NodePickerFilters | undefined>();

  const [customNodeTypes, setCustomNodeTypes] = useState<NodeTypes>();

  useEffect(() => {
    if (!specJson) return;
    const filters = getNodePickerFilters(nodes, lastConnectStart, specJson);

    setFilters(filters);
  }, [lastConnectStart, nodes, specJson]);

  useEffect(() => {
    if (!specJson) return;
    const customNodeTypes = getCustomNodeTypes(specJson, scene);

    setCustomNodeTypes(customNodeTypes);
  }, [specJson, scene]);

  return { filters, customNodeTypes, specJson };
};

export default useFlowConfigFromRegistry;
