import * as fs from 'fs/promises';

import Debug from '../lib/Debug';
import GraphEvaluator from '../lib/Graphs/GraphEvaluator';
import loadGraph from '../lib/Graphs/loadGraph';
import registerGenericNodes from '../lib/Nodes/Generic/GenericNodes';
import NodeRegistry from '../lib/Nodes/NodeRegistry';
import registerThreeNodes from '../lib/Nodes/Three/ThreeNodes';

async function main() {
  const nodeRegistry = new NodeRegistry();
  registerGenericNodes(nodeRegistry);
  registerThreeNodes(nodeRegistry);

  const graphJsonPath = process.argv[2];
  if (graphJsonPath === undefined) {
    throw new Error('no path specified');
  }
  Debug.log(`reading behavior graph: ${graphJsonPath}`);
  const textFile = await fs.readFile(graphJsonPath, { encoding: 'utf-8' });
  // console.log(textFile);
  const graph = loadGraph(JSON.parse(textFile), nodeRegistry);
  graph.name = graphJsonPath;
  // console.log(graph);

  Debug.log('creating behavior graph');
  const graphEvaluator = new GraphEvaluator(graph);

  Debug.log('triggering start event');
  graphEvaluator.triggerEvents('event/start');

  Debug.log('executing all');

  graphEvaluator.executeAllAsync();
}

main();
