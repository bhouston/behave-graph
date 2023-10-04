import {
  getCoreRegistry,
  GraphJSON,
} from '@behave-graph/core';

import rawFlowGraph from '../../../../graphs/react-flow/graph.json';
import { behaveToFlow } from './behaveToFlow.js';
import { flowToBehave } from './flowToBehave.js';
import { NodeSpecGenerator } from '../hooks/useNodeSpecGenerator';

const flowGraph = rawFlowGraph as GraphJSON;

const [nodes, edges] = behaveToFlow(flowGraph);

it('transforms from flow to behave', () => {
  const registry = getCoreRegistry();
  const specGenerator = new NodeSpecGenerator(registry);
  const output = flowToBehave(nodes, edges, specGenerator);
  expect(output).toEqual(flowGraph);
});
