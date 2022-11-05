import { flowToBehave } from './flowToBehave';
import rawFlowGraph from '../graph.json';
import { GraphJSON } from '@behavior-graph/framework';
import { behaveToFlow } from './behaveToFlow';

const flowGraph = rawFlowGraph as GraphJSON;

const [nodes, edges] = behaveToFlow(flowGraph);

it('transforms from flow to behave', () => {
  // const output = flowToBehave(nodes, edges);
  // expect(output).toEqual(flowGraph);
});
