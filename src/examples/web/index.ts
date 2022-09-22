import {
  GraphEvaluator, Logger, readGraphFromJSON, registerGenericNodes,
  Registry,
} from '../../../dist/lib/index';

async function main() {
  Logger.onVerbose.clear();

  const registry = new Registry();
  registerGenericNodes(registry.nodes);

  const urlSearchParams = new URLSearchParams(window.location.search);
  const graphName = urlSearchParams.get('graph');
  const graphJsonPath = `/examples/basics/${graphName}.json`;
  if (graphJsonPath === undefined) {
    throw new Error('no path specified');
  }

  Logger.verbose(`reading behavior graph: ${graphJsonPath}`);
  const json = await (await fetch(graphJsonPath)).json();
  const graph = readGraphFromJSON(json, registry);
  graph.name = graphJsonPath;

  // await fs.writeFile('./examples/test.json', JSON.stringify(writeGraphToJSON(graph), null, ' '), { encoding: 'utf-8' });

  Logger.verbose('creating behavior graph');
  const graphEvaluator = new GraphEvaluator(graph);

  Logger.verbose('triggering start event');
  graphEvaluator.triggerEvents('event/start');

  Logger.verbose('executing all (async)');
  await graphEvaluator.executeAllAsync();
}

main();
