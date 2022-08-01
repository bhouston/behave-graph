import * as fs from 'fs/promises';
import Debug from '../lib/Debug';
import GraphEvaluator from '../lib/Graphs/GraphEvaluator';
import loadGraph from '../lib/Graphs/loadGraph';
import registerGenericNodes from '../lib/Nodes/Generic/GenericNodes';
import NodeRegistry from '../lib/Nodes/NodeRegistry';
import registerThreeNodes from '../lib/Nodes/Three/ThreeNodes';

const delay = (ms:number) => new Promise((resolve) => setTimeout(resolve, ms));

const duration = 3;

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
  const loopDuration = 0.1;
  const loopIterations = duration / loopDuration;
  for (let i = 0; i < loopIterations; i++) {
    graphEvaluator.executeAll();
    // eslint-disable-next-line no-await-in-loop
    await delay(loopDuration * 1000);
  }
}

main();
