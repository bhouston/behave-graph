import { promises as fs } from 'node:fs';

import { program } from 'commander';
import glob from 'glob';

import {
  Logger,
  Engine,
  traceToLogger,
  readGraphFromJSON,
  writeGraphToJSON,
  validateGraph,
  DefaultLogger,
  ManualLifecycleEventEmitter,
  registerCoreProfile,
  registerSceneProfile,
  Registry,
  validateRegistry
} from 'behave-graph';
import { parseSafeFloat } from 'behave-graph/src/parseFloats';

async function main() {
  //Logger.onVerbose.clear();

  program
    .name('exec-graph')
    .argument('<filename>', 'path to the behavior-graph json to execute')
    .option('-t, --trace', `trace node execution`)
    .option('-p, --profile', `profile execution time`)
    .option('-d, --dryRun', `do not run graph`)
    .option(
      '-u, --upgrade',
      `write json graph back to read location, upgrading format`
    )
    .option('-i, --iterations <iterations>', 'number of tick iterations', '5');

  program.parse(process.argv);
  const programOptions = program.opts();

  const registry = new Registry();
  const manualLifecycleEventEmitter = new ManualLifecycleEventEmitter();
  const logger = new DefaultLogger();
  registerCoreProfile(registry, logger, manualLifecycleEventEmitter);
  registerSceneProfile(registry);

  const jsonPattern = program.args[0];

  glob(jsonPattern, {}, async (err, matches) => {
    for (let i = 0; i < matches.length; i++) {
      const graphJsonPath = matches[i];
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
        await fs.writeFile(
          graphJsonPath,
          JSON.stringify(newGraphJson, null, 2)
        );
      }

      Logger.verbose('creating behavior graph');
      const engine = new Engine(graph);

      if (programOptions.trace) {
        engine.onNodeExecution.addListener(traceToLogger);
      }

      if (programOptions.dryRun) {
        continue;
      }

      const startTime = Date.now();

      Logger.verbose('initialize graph');
      let numSteps = await engine.executeAllSync();

      if (manualLifecycleEventEmitter.startEvent.listenerCount > 0) {
        Logger.verbose('triggering start event');
        manualLifecycleEventEmitter.startEvent.emit();

        Logger.verbose('executing all (async)');
        numSteps += await engine.executeAllAsync(5);
      }

      if (manualLifecycleEventEmitter.tickEvent.listenerCount > 0) {
        const iterations = parseSafeFloat(programOptions.iterations, 5);
        for (let tick = 0; tick < iterations; tick++) {
          Logger.verbose(`triggering tick (${tick} of ${iterations})`);
          manualLifecycleEventEmitter.tickEvent.emit();

          Logger.verbose('executing all (async)');
          // eslint-disable-next-line no-await-in-loop
          numSteps += await engine.executeAllAsync(5);
        }
      }

      if (manualLifecycleEventEmitter.endEvent.listenerCount > 0) {
        Logger.verbose('triggering end event');
        manualLifecycleEventEmitter.endEvent.emit();

        Logger.verbose('executing all (async)');
        numSteps += await engine.executeAllAsync(5);
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

      engine.dispose();
    }
  });
}

main();
