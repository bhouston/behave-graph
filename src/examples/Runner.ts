import * as fs from 'fs/promises';
import GraphEvaluator from '../lib/Graphs/GraphEvaluator';
import loadGraph from '../lib/Graphs/loadGraph';
import registerGenericNodes from '../lib/Nodes/Generic/GenericNodes';
import NodeRegistry from '../lib/Nodes/NodeRegistry';
import registerThreeNodes from '../lib/Nodes/Three/ThreeNodes';

const verbose = false;

async function main() {
  const nodeRegistry = new NodeRegistry();
  registerGenericNodes(nodeRegistry);
  registerThreeNodes(nodeRegistry);

  const graphJsonPath = process.argv[2];
  if (graphJsonPath === undefined) {
    throw new Error('no path specified');
  }
  if (verbose) console.log(`reading behavior graph: ${graphJsonPath}`);
  const textFile = await fs.readFile(graphJsonPath, { encoding: 'utf-8' });
  // console.log(textFile);
  const graph = loadGraph(JSON.parse(textFile), nodeRegistry);
  graph.name = graphJsonPath;
  // console.log(graph);

  if (verbose) console.log('creating behavior graph');
  const graphEvaluator = new GraphEvaluator(graph);

  if (verbose) console.log('triggering start event');
  graphEvaluator.triggerEvents('event/start', new Map<string, any>().set('flow', true));

  if (verbose) console.log('executing all');
  graphEvaluator.executeAll();
}

main();
