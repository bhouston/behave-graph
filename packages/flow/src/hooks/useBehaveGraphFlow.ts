import { GraphJSON } from '@behave-graph/core';
import { useCallback, useEffect, useState } from 'react';
import { useEdgesState, useNodesState } from 'reactflow';

import { behaveToFlow } from '../transformers/behaveToFlow.js';
import { flowToBehave } from '../transformers/flowToBehave.js';
import { autoLayout } from '../util/autoLayout.js';
import { hasPositionMetaData } from '../util/hasPositionMetaData.js';
import { useCustomNodeTypes } from './useCustomNodeTypes.js';
import { NodeSpecGenerator } from './useNodeSpecGenerator.js';

export const fetchBehaviorGraphJson = async (url: string) =>
  // eslint-disable-next-line unicorn/no-await-expression-member
  (await (await fetch(url)).json()) as GraphJSON;

/**
 * Hook that returns the nodes and edges for react-flow, and the graphJson for the behave-graph.
 * If nodes or edges are changes, the graph json is updated automatically.
 * The graph json can be set manually, in which case the nodes and edges are updated to match the graph json.
 * @param param0
 * @returns
 */
export const useBehaveGraphFlow = ({
  initialGraphJson,
  specGenerator
}: {
  initialGraphJson: GraphJSON;
  specGenerator: NodeSpecGenerator | undefined;
}) => {
  const [graphJson, setStoredGraphJson] = useState<GraphJSON | undefined>();
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  const setGraphJson = useCallback(
    (graphJson: GraphJSON) => {
      if (!graphJson) return;

      const [nodes, edges] = behaveToFlow(graphJson);

      if (hasPositionMetaData(graphJson) === false) {
        autoLayout(nodes, edges);
      }

      setNodes(nodes);
      setEdges(edges);
      setStoredGraphJson(graphJson);
    },
    [setEdges, setNodes]
  );

  useEffect(() => {
    if (!initialGraphJson) return;
    setGraphJson(initialGraphJson);
  }, [initialGraphJson, setGraphJson]);

  useEffect(() => {
    if (!specGenerator) return;
    // when nodes and edges are updated, update the graph json with the flow to behave behavior
    const graphJson = flowToBehave(nodes, edges, specGenerator);
    setStoredGraphJson(graphJson);
  }, [nodes, edges, specGenerator]);

  const nodeTypes = useCustomNodeTypes({
    specGenerator
  });

  return {
    nodes,
    edges,
    onEdgesChange,
    onNodesChange,
    setGraphJson,
    graphJson,
    nodeTypes
  };
};
