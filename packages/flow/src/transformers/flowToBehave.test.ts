import {
  createRegistry,
  GraphJSON,
  registerCoreProfile,
  writeNodeSpecsToJSON
} from '@behave-graph/core';

import rawFlowGraph from '../../../../graphs/react-flow/graph.json';
import { behaveToFlow } from './behaveToFlow';
import { flowToBehave } from './flowToBehave';

const flowGraph = rawFlowGraph as GraphJSON;

const [nodes, edges] = behaveToFlow(flowGraph);

it('transforms from flow to behave', () => {
  const registry = createRegistry();
  registerCoreProfile(registry);
  const specJSON = writeNodeSpecsToJSON({ registry, dependencies: {} });
  const output = flowToBehave(nodes, edges, specJSON);
  expect(output).toEqual(flowGraph);
});
