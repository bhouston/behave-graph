import * as fs from 'fs/promises';

import {
  Debug,
  GraphEvaluator,
  GraphTypeRegistry,
  readGraphFromJSON,
  registerGenericNodes,
// eslint-disable-next-line import/extensions
} from '../../dist/lib/index';

async function main() {
  const registry = new GraphTypeRegistry();
  registerGenericNodes(registry);

  const graphJsonPath = process.argv[2];
  if (graphJsonPath === undefined) {
    throw new Error('no path specified');
  }

  Debug.log(`reading behavior graph: ${graphJsonPath}`);
  const textFile = await fs.readFile(graphJsonPath, { encoding: 'utf-8' });
  const graph = readGraphFromJSON(JSON.parse(textFile), registry);
  graph.name = graphJsonPath;

  // await fs.writeFile('./examples/test.json', JSON.stringify(writeGraphToJSON(graph), null, ' '), { encoding: 'utf-8' });

  Debug.log('creating behavior graph');
  const graphEvaluator = new GraphEvaluator(graph);

  Debug.log('triggering start event');
  graphEvaluator.triggerEvents('event/start');

  Debug.log('executing all (async)');
  await graphEvaluator.executeAllAsync();
}

main();
