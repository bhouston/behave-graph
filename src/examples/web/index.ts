import {
  Debug,
  GraphEvaluator,
  GraphTypeRegistry,
  readGraphFromJSON,
  registerGenericNodes,
} from '../../../dist/lib/index';

async function main() {
  const registry = new GraphTypeRegistry();
  registerGenericNodes(registry);

  const urlSearchParams = new URLSearchParams(window.location.search);
  const graphName = urlSearchParams.get('graph');
  const graphJsonPath = `/examples/basics/${graphName}.json`;
  if (graphJsonPath === undefined) {
    throw new Error('no path specified');
  }

  Debug.log(`reading behavior graph: ${graphJsonPath}`);
  const json = await (await fetch(graphJsonPath)).json();
  const graph = readGraphFromJSON(json, registry);
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
