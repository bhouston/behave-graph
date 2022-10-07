import { promises as fs } from 'node:fs';

import {
  DefaultLogger,
  GraphEvaluator,
  Logger,
  ManualLifecycleEventEmitter,
  NodeEvaluationType,
  readGraphFromJSON,
  registerCoreProfile,
  registerSceneProfile,
  Registry,
  validateDirectedAcyclicGraph,
  validateLinks,
  validateNodeRegistry
} from '../../lib';

async function main() {
  Logger.onVerbose.clear();

  const registry = new Registry();
  registerCoreProfile(registry);
  registerSceneProfile(registry);

  registry.implementations.register('ILogger', new DefaultLogger());
  const manualLifecycleEventEmitter = new ManualLifecycleEventEmitter();
  registry.implementations.register(
    'ILifecycleEventEmitter',
    manualLifecycleEventEmitter
  );

  const graphJsonPath = process.argv[2];
  if (graphJsonPath === undefined) {
    throw new Error('no path specified');
  }

  Logger.verbose(`reading behavior graph: ${graphJsonPath}`);
  const textFile = await fs.readFile(graphJsonPath);
  const graph = readGraphFromJSON(
    JSON.parse(textFile.toString('utf8')),
    registry
  );
  graph.name = graphJsonPath;

  Logger.verbose('validating:');
  const errorList: string[] = [];
  Logger.verbose('validating registry');
  errorList.push(...validateNodeRegistry(registry));
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
      Logger.verbose(
        `Node ${event.node.typeName} ${event.node.id} completed evaluation.`
      );
    } else {
      Logger.verbose(
        `Node ${event.node.typeName} ${event.node.id} started evaluation, ` +
          `mode: ${NodeEvaluationType[event.nodeEvaluationType]}, async: ${
            event.async
          }.`
      );
    }
  });

  const startTime = Date.now();

  Logger.verbose('initialize graph');
  let numSteps = await graphEvaluator.executeAll();

  Logger.verbose('triggering start event');
  manualLifecycleEventEmitter.startEvent.emit();

  Logger.verbose('executing all (async)');
  numSteps += await graphEvaluator.executeAllAsync(5);

  for (let tick = 0; tick < 5; tick++) {
    Logger.verbose('triggering tick');
    manualLifecycleEventEmitter.tickEvent.emit();

    Logger.verbose('executing all (async)');
    // eslint-disable-next-line no-await-in-loop
    numSteps += await graphEvaluator.executeAllAsync(5);
  }

  Logger.verbose('triggering end event');
  manualLifecycleEventEmitter.endEvent.emit();

  Logger.verbose('executing all (async)');
  numSteps += await graphEvaluator.executeAllAsync(5);

  const deltaTime = Date.now() - startTime;

  Logger.info(
    `  ${numSteps} nodes executed in ${
      deltaTime / 1000
    } seconds, at a rate of ${Math.round(
      (numSteps * 1000) / deltaTime
    )} steps/second`
  );
}

main();
