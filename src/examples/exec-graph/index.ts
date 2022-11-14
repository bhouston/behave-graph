import { promises as fs } from 'node:fs';

import { program } from 'commander';
import glob from 'glob';

import { Logger } from '../../lib/Diagnostics/Logger.js';
import { Engine } from '../../lib/Execution/Engine.js';
import { traceToLogger } from '../../lib/Execution/traceToLogger.js';
import { readGraphFromJSON } from '../../lib/Graphs/IO/readGraphFromJSON.js';
import { writeGraphToJSON } from '../../lib/Graphs/IO/writeGraphToJSON.js';
import { validateGraph } from '../../lib/Graphs/Validation/validateGraph.js';
import { DefaultLogger, ManualLifecycleEventEmitter } from '../../lib/index.js';
import { parseSafeFloat } from '../../lib/parseFloats.js';
import { registerCoreProfile } from '../../lib/Profiles/Core/registerCoreProfile.js';
import { registerSceneProfile } from '../../lib/Profiles/Scene/registerSceneProfile.js';
import { Registry } from '../../lib/Registry.js';
import { validateRegistry } from '../../lib/validateRegistry.js';
import { DummyScene } from './DummyScene.js';

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
  registerSceneProfile(registry, new DummyScene(registry));

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
