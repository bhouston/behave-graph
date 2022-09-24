import { promises as fs } from 'fs';

import {
  DefaultLogger, GraphEvaluator, Logger, ManualLifecycleEventEmitter,
  NodeEvaluationType,
  readGraphFromJSON,
  registerCoreProfile,
  Registry, validateDirectedAcyclicGraph, validateGraphRegistry, validateLinks,
} from '../../../dist/lib/index';

async function main() {
  Logger.onVerbose.clear();

  const registry = new Registry();
  registerCoreProfile(registry);

  registry.implementations.register('ILogger', new DefaultLogger());
  const manualLifecycleEventEmitter = new ManualLifecycleEventEmitter();
  registry.implementations.register('ILifecycleEventEmitter', manualLifecycleEventEmitter);

  const graphJsonPath = process.argv[2];
  if (graphJsonPath === undefined) {
    throw new Error('no path specified');
  }

  Logger.verbose(`reading behavior graph: ${graphJsonPath}`);
  const textFile = await fs.readFile(graphJsonPath, { encoding: 'utf-8' });
  const graph = readGraphFromJSON(JSON.parse(textFile), registry);
  graph.name = graphJsonPath;

  // await fs.writeFile('./examples/test.json', JSON.stringify(writeGraphToJSON(graph), null, ' '), { encoding: 'utf-8' });
  Logger.verbose('validating:');
  const errorList: string[] = [];
  Logger.verbose('validating registry');
  errorList.push(...validateGraphRegistry(registry));
  Logger.verbose('validating socket links have matching types on either end');
  errorList.push(...validateLinks(graph));
  Logger.verbose('validating that graph is directed acyclic');
  errorList.push(...validateDirectedAcyclicGraph(graph));

  if (errorList.length > 0) {
    Logger.error(`${errorList.length} errors found:`);
    errorList.forEach((errorText, errorIndex) => {
      Logger.error(`${errorIndex}: ${errorText}`);
    });
    return;
  }

  Logger.verbose('creating behavior graph');
  const graphEvaluator = new GraphEvaluator(graph);

  graphEvaluator.onNodeEvaluation.addListener((event) => {
    if (event.nodeEvaluationType === NodeEvaluationType.None) {
      Logger.verbose(`Node ${event.node.typeName} ${event.node.id} completed evaluation.`);
    } else {
      Logger.verbose(`Node ${event.node.typeName} ${event.node.id} started evaluation, `
      + `mode: ${NodeEvaluationType[event.nodeEvaluationType]}, async: ${event.async}.`);
    }
  });

  Logger.verbose('initialize graph');
  await graphEvaluator.executeAll();

  Logger.verbose('triggering start event');
  manualLifecycleEventEmitter.startEvent.emit();

  Logger.verbose('executing all (async)');
  await graphEvaluator.executeAllAsync(5.0);

  for (let tick = 0; tick < 5; tick++) {
    Logger.verbose('triggering tick');
    manualLifecycleEventEmitter.tickEvent.emit();

    Logger.verbose('executing all (async)');
    // eslint-disable-next-line no-await-in-loop
    await graphEvaluator.executeAllAsync(5.0);
  }

  Logger.verbose('triggering end event');
  manualLifecycleEventEmitter.endEvent.emit();

  Logger.verbose('executing all (async)');
  await graphEvaluator.executeAllAsync(5.0);
}

main();
