import * as THREEIFY from 'threeify';

import {
  DefaultLogger,
  GraphEvaluator,
  Logger,
  ManualLifecycleEventEmitter,
  readGraphFromJSON,
  registerCoreProfile,
  registerSceneGraphProfile,
  Registry
} from '../../lib';

async function main() {
  Logger.onVerbose.clear();
  //const geometry = icosahedronGeometry(0.75, 5);
  console.log(THREEIFY);
  const registry = new Registry();
  registerCoreProfile(registry);
  registerSceneGraphProfile(registry);

  registry.implementations.register('ILogger', new DefaultLogger());
  const manualLifecycleEventEmitter = new ManualLifecycleEventEmitter();
  registry.implementations.register(
    'ILifecycleEventEmitter',
    manualLifecycleEventEmitter
  );

  const graphJsonPath = '/dist/graphs/core/HelloWorld.json';
  if (graphJsonPath === undefined) {
    throw new Error('no path specified');
  }

  Logger.verbose(`reading behavior graph: ${graphJsonPath}`);
  const request = await fetch(graphJsonPath);
  console.log('request', request);
  const json = await request.json();
  console.log('json', json);
  const graph = readGraphFromJSON(json, registry);
  graph.name = graphJsonPath;

  // await fs.writeFile('./examples/test.json', JSON.stringify(writeGraphToJSON(graph), null, ' '), { encoding: 'utf-8' });

  Logger.info('creating behavior graph');
  const graphEvaluator = new GraphEvaluator(graph);

  Logger.info('executing all (async)');
  await graphEvaluator.executeAllAsync();
}

main();
