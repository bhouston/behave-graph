import { promises as fs } from 'node:fs';

import { program } from 'commander';
import glob from 'glob';

import { Logger } from '../../lib/Diagnostics/Logger.js';
import { GraphEvaluator } from '../../lib/Graphs/Evaluation/GraphEvaluator.js';
import { traceToLogger } from '../../lib/Graphs/Evaluation/traceToLogger.js';
import { readGraphFromJSON } from '../../lib/Graphs/IO/readGraphFromJSON.js';
import { writeGraphToJSON } from '../../lib/Graphs/IO/writeGraphToJSON.js';
import { validateGraph } from '../../lib/Graphs/Validation/validateGraph.js';
import { parseSafeFloat } from '../../lib/parseFloats.js';
import { DefaultLogger } from '../../lib/Profiles/Core/Abstractions/Drivers/DefaultLogger.js';
import { ManualLifecycleEventEmitter } from '../../lib/Profiles/Core/Abstractions/Drivers/ManualLifecycleEventEmitter.js';
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
  registerCoreProfile(registry);
  registerSceneProfile(registry);

  registry.abstractions.register('ILogger', new DefaultLogger());
  const manualLifecycleEventEmitter = new ManualLifecycleEventEmitter();
  registry.abstractions.register(
    'ILifecycleEventEmitter',
    manualLifecycleEventEmitter
  );
  registry.abstractions.register('IScene', new DummyScene(registry));

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
      const graphEvaluator = new GraphEvaluator(graph);

      if (programOptions.trace) {
        graphEvaluator.onNodeEvaluation.addListener(traceToLogger);
      }

      if (programOptions.dryRun) {
        continue;
      }

      const startTime = Date.now();

      Logger.verbose('initialize graph');
      let numSteps = await graphEvaluator.executeAllSync();

      if (manualLifecycleEventEmitter.startEvent.listenerCount > 0) {
        Logger.verbose('triggering start event');
        manualLifecycleEventEmitter.startEvent.emit();

        Logger.verbose('executing all (async)');
        numSteps += await graphEvaluator.executeAllAsync(5);
      }

      if (manualLifecycleEventEmitter.tickEvent.listenerCount > 0) {
        const iteations = parseSafeFloat(programOptions.iterations, 5);
        for (let tick = 0; tick < iteations; tick++) {
          Logger.verbose(`triggering tick (${tick} of ${iteations})`);
          manualLifecycleEventEmitter.tickEvent.emit();

          Logger.verbose('executing all (async)');
          // eslint-disable-next-line no-await-in-loop
          numSteps += await graphEvaluator.executeAllAsync(5);
        }
      }

      if (manualLifecycleEventEmitter.endEvent.listenerCount > 0) {
        Logger.verbose('triggering end event');
        manualLifecycleEventEmitter.endEvent.emit();

        Logger.verbose('executing all (async)');
        numSteps += await graphEvaluator.executeAllAsync(5);
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
  });
}

main();
