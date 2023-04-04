import {
  getCoreRegistry,
  GraphJSON,
  writeNodeSpecsToJSON
} from '@behave-graph/core';

import rawFlowGraph from '../../../../graphs/react-flow/graph.json';
import { behaveToFlow } from './behaveToFlow';
import { flowToBehave } from './flowToBehave';

const flowGraph = rawFlowGraph as GraphJSON;

const [nodes, edges] = behaveToFlow(flowGraph);

it('transforms from flow to behave', () => {
  const { values: valueTypes, nodes: nodeDefinitions } = getCoreRegistry();
  const specJSON = writeNodeSpecsToJSON({
    values: valueTypes,
    nodes: nodeDefinitions,
    dependencies: {}
  });
  const output = flowToBehave(nodes, edges, specJSON);
  expect(output).toEqual(flowGraph);
});
