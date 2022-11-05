import { IScene, NodeSpecJSON, Registry } from '@behavior-graph/framework';
import { useEffect, useState } from 'react';
import { NodeTypes, Node, OnConnectStartParams } from 'reactflow';
import { NodePickerFilters } from '../components/NodePicker';
import getCustomNodeTypes from '../util/getCustomNodeTypes';
import { getNodePickerFilters } from '../util/getPickerFilters';

const useFlowConfigFromRegistry = ({
  registry,
  nodes,
  lastConnectStart,
  specJson,
  scene,
}: {
  registry: Registry | undefined;
  nodes: Node<any>[];
  lastConnectStart: OnConnectStartParams | undefined;
  specJson: NodeSpecJSON[];
  scene: IScene;
}) => {
  const [filters, setFilters] = useState<NodePickerFilters | undefined>();

  const [customNodeTypes, setCustomNodeTypes] = useState<NodeTypes>();

  useEffect(() => {
    if (!registry) return;
  }, [registry]);

  useEffect(() => {
    if (!specJson) return;
    const filters = getNodePickerFilters(nodes, lastConnectStart, specJson);

    setFilters(filters);
  }, [lastConnectStart, nodes, specJson]);

  useEffect(() => {
    if (!specJson) return;
    const customNodeTypes = getCustomNodeTypes(specJson, scene);

    setCustomNodeTypes(customNodeTypes);
  }, [specJson]);

  return { filters, customNodeTypes, specJson };
};

export default useFlowConfigFromRegistry;
