#!/usr/bin/env -S node --experimental-modules

import { promises as fs } from 'node:fs';
import process from 'node:process';

import {
  DefaultLogger,
  Engine,
  Logger,
  ManualLifecycleEventEmitter,
  parseSafeFloat,
  readGraphFromJSON,
  registerCoreProfile,
  registerLifecycleEventEmitter,
  registerLogger,
  registerSceneProfile,
  Registry,
  validateGraph,
  validateRegistry,
  writeGraphToJSON
} from '@behave-graph/core';
import { program } from 'commander';

type ProgramOptions = {
  upgrade?: boolean;
  trace?: boolean;
  dryRun?: boolean;
  profile?: boolean;
  iterations: string;
};

async function execGraph({
  jsonPattern,
  programOptions
}: {
  jsonPattern: string;
  programOptions: ProgramOptions;
}) {
  const registry = new Registry();
  const manualLifecycleEventEmitter = new ManualLifecycleEventEmitter();
  const logger = new DefaultLogger();
  registerCoreProfile(registry);
  registerSceneProfile(registry);
  registerLogger(registry.dependencies, logger);
  registerLifecycleEventEmitter(
    registry.dependencies,
    manualLifecycleEventEmitter
  );

  const graphJsonPath = jsonPattern;
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
  const engine = new Engine(graph);

  if (programOptions.trace) {
    engine.onNodeExecutionStart.addListener((node) =>
      Logger.verbose(`<< ${node.description.typeName}:${node.id} >> START`)
    );
    engine.onNodeExecutionEnd.addListener((node) =>
      Logger.verbose(`<< ${node.description.typeName}:${node.id} >> END`)
    );
  }

  if (programOptions.dryRun) {
    return;
  }

  const startTime = Date.now();
  if (manualLifecycleEventEmitter.startEvent.listenerCount > 0) {
    Logger.verbose('triggering start event');
    manualLifecycleEventEmitter.startEvent.emit();

    Logger.verbose('executing all (async)');
    await engine.executeAllAsync(5);
  }

  if (manualLifecycleEventEmitter.tickEvent.listenerCount > 0) {
    const iterations = parseSafeFloat(programOptions.iterations, 5);
    for (let tick = 0; tick < iterations; tick++) {
      Logger.verbose(`triggering tick (${tick} of ${iterations})`);
      manualLifecycleEventEmitter.tickEvent.emit();

      Logger.verbose('executing all (async)');
      // eslint-disable-next-line no-await-in-loop
      await engine.executeAllAsync(5);
    }
  }

  if (manualLifecycleEventEmitter.endEvent.listenerCount > 0) {
    Logger.verbose('triggering end event');
    manualLifecycleEventEmitter.endEvent.emit();

    Logger.verbose('executing all (async)');
    await engine.executeAllAsync(5);
  }

  if (programOptions.profile) {
    const deltaTime = Date.now() - startTime;
    Logger.info(
      `\n  Profile Results: ${engine.executionSteps} nodes executed in ${
        deltaTime / 1000
      } seconds, at a rate of ${Math.round(
        (engine.executionSteps * 1000) / deltaTime
      )} steps/second`
    );
  }

  engine.dispose();
}

async function main() {
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
  const programOptions = program.opts() as ProgramOptions;

  const jsonPattern = program.args[0];

  await execGraph({ programOptions, jsonPattern });
}

main();
