---
sidebar_position: 3
---

# Running The Engine

To be able to run Behave Graph, you need to have a graph in JSON format. You can create a graph using the [Graph Editor](./graph-editor) or by writing it manually.

You will also need to configure the registry with the profiles you want to use. You can read more about profiles [here](./core-concepts/profiles).

Here's an example code of how should look like:

```ts
import {
  DefaultLogger,
  Engine,
  readGraphFromJSON,
  registerCoreProfile,
  Registry,
  ManualLifecycleEventEmitter,
} from '@behave-graph/core';

import myGraphJson from './myGraph.json';

/** Setup the Registry **/
const registry = new Registry();
const logger = new DefaultLogger();
const manualLifecycleEventEmitter = new ManualLifecycleEventEmitter();

registerCoreProfile(registry, logger, manualLifecycleEventEmitter);

/** Prepare the Graph **/
const graph = readGraphFromJSON(myGraphJson, registry);

/** Run the Graph **/
const engine = new Engine(graph);

/** Trigger events **/

if (manualLifecycleEventEmitter.startEvent.listenerCount > 0) {
  manualLifecycleEventEmitter.startEvent.emit();
  await engine.executeAllAsync(5);
}

if (manualLifecycleEventEmitter.tickEvent.listenerCount > 0) {
  const iterations = 20;
  const tickDuration = 0.01;
  for (let tick = 0; tick < iterations; tick++) {
    manualLifecycleEventEmitter.tickEvent.emit();
    engine.executeAllSync(tickDuration);
    await sleep(tickDuration);
  }
}

if (manualLifecycleEventEmitter.endEvent.listenerCount > 0) {
  manualLifecycleEventEmitter.endEvent.emit();
  await engine.executeAllAsync(5);
}

```