import * as fs from 'fs/promises';

import {
  Debug, GraphEvaluator, GraphRegistry, readGraphFromJSON, registerGenericNodes, validateDirectedAcyclicGraph, validateLinks,
} from '../../../dist/lib/index';

async function main() {
  Debug.verbose = false;

  const registry = new GraphRegistry();
  registerGenericNodes(registry.nodes);

  const graphJsonPath = process.argv[2];
  if (graphJsonPath === undefined) {
    throw new Error('no path specified');
  }

  Debug.logVerbose(`reading behavior graph: ${graphJsonPath}`);
  const textFile = await fs.readFile(graphJsonPath, { encoding: 'utf-8' });
  const graph = readGraphFromJSON(JSON.parse(textFile), registry);
  graph.name = graphJsonPath;

  // await fs.writeFile('./examples/test.json', JSON.stringify(writeGraphToJSON(graph), null, ' '), { encoding: 'utf-8' });
  Debug.logVerbose('validating behavior graph');
  const errorList: string[] = [];
  Debug.logVerbose('validating socket links have matching types on either end');
  errorList.push(...validateLinks(graph));
  Debug.logVerbose('validating that graph is directed acyclic');
  errorList.push(...validateDirectedAcyclicGraph(graph));
  if (errorList.length > 0) {
    Debug.logError(`graph is invalidate, ${errorList.length} errors found:`);
    errorList.forEach((errorText, errorIndex) => {
      Debug.logError(`${errorIndex}: ${errorText}`);
    });
    return;
  }

  Debug.logVerbose('creating behavior graph');
  const graphEvaluator = new GraphEvaluator(graph);

  Debug.logVerbose('triggering start event');
  graphEvaluator.triggerEvents('event/start');

  Debug.logVerbose('executing all (async)');
  await graphEvaluator.executeAllAsync();
}

main();
