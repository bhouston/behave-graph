import { promises as fs } from 'node:fs';

import { program } from 'commander';

import {
  DefaultLogger,
  GraphEvaluator,
  Logger,
  ManualLifecycleEventEmitter,
  readGraphFromJSON,
  registerCoreProfile,
  registerSceneProfile,
  Registry,
  traceToLogger,
  validateGraph,
  validateRegistry,
  writeGraphToJSON
} from '../../lib';

async function main() {
  Logger.onVerbose.clear();

  program
    .name('exec-graph')
    .argument('<filename>', 'path to the behavior-graph json to execute')
    .option('-t, --trace', `trace node execution`)
    .option('-p, --profile', `profile execution time`)
    .option(
      '-u, --upgrade',
      `write json graph back to read location, upgrading format`
    );

  program.parse(process.argv);
  const programOptions = program.opts();

  const registry = new Registry();
  registerCoreProfile(registry);
  registerSceneProfile(registry);

  registry.implementations.register('ILogger', new DefaultLogger());
  const manualLifecycleEventEmitter = new ManualLifecycleEventEmitter();
  registry.implementations.register(
    'ILifecycleEventEmitter',
    manualLifecycleEventEmitter
  );

  const graphJsonPath = program.args[0];
  Logger.verbose(`reading behavior graph: ${graphJsonPath}`);
  const textFile = await fs.readFile(graphJsonPath);
  const graph = readGraphFromJSON(
    JSON.parse(textFile.toString('utf8')),
    registry
  );
  graph.name = graphJsonPath;

  const errorList: string[] = [];
  errorList.push(...validateRegistry(registry), ...validateGraph(graph));

  if (errorList.length > 0) {
    Logger.error(`${errorList.length} errors found:`);
    errorList.forEach((errorText, errorIndex) => {
      Logger.error(`${errorIndex}: ${errorText}`);
    });
    return;
  }

  if (programOptions.upgrade) {
    const newGraphJson = writeGraphToJSON(graph);
    await fs.writeFile(graphJsonPath, JSON.stringify(newGraphJson, null, 2));
  }

  Logger.verbose('creating behavior graph');
  const graphEvaluator = new GraphEvaluator(graph);

  if (programOptions.trace) {
    graphEvaluator.onNodeEvaluation.addListener(traceToLogger);
  }
  const startTime = Date.now();

  Logger.verbose('initialize graph');
  const numSteps = await graphEvaluator.executeAll();

  if (manualLifecycleEventEmitter.startEvent.listenerCount > 0) {
    Logger.verbose('triggering start event');
    manualLifecycleEventEmitter.startEvent.emit();

    Logger.verbose('executing all (async)');
    await graphEvaluator.executeAllAsync(5);
  }

  if (manualLifecycleEventEmitter.tickEvent.listenerCount > 0) {
    for (let tick = 0; tick < 5; tick++) {
      Logger.verbose('triggering tick');
      manualLifecycleEventEmitter.tickEvent.emit();

      Logger.verbose('executing all (async)');
      // eslint-disable-next-line no-await-in-loop
      await graphEvaluator.executeAllAsync(5);
    }
  }

  if (manualLifecycleEventEmitter.endEvent.listenerCount > 0) {
    Logger.verbose('triggering end event');
    manualLifecycleEventEmitter.endEvent.emit();

    Logger.verbose('executing all (async)');
    await graphEvaluator.executeAllAsync(5);
  }

  if (programOptions.profile) {
    const deltaTime = Date.now() - startTime;
    Logger.info(
      `Profile Results: ${numSteps} nodes executed in ${
        deltaTime / 1000
      } seconds, at a rate of ${Math.round(
        (numSteps * 1000) / deltaTime
      )} steps/second`
    );
  }
}

main();
