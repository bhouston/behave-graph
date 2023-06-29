import { GraphJSON } from '@behave-graph/core';

import rawFlowGraph from '../../../../graphs/react-flow/graph.json';
import { behaveToFlow } from './behaveToFlow.js';
import { flowToBehave } from './flowToBehave.js';

const flowGraph = rawFlowGraph as GraphJSON;

const [nodes, edges] = behaveToFlow(flowGraph);

it('transforms from flow to behave', () => {
  const output = flowToBehave(nodes, edges);
  expect(output).toEqual(flowGraph);
});
