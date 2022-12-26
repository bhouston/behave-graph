---
sidebar_position: 2
---

# Profiles

A profile is a function that updates the registry with the nodes and value types that are available in the system. The profile usually also includes the [Abstractions](./abstractions) that are required for the nodes to work as parameters.

## Using official Profiles

The official profiles are available in the `@behave-graph/core` package.

```ts
import {
  DefaultLogger,
  DummyScene,
  ManualLifecycleEventEmitter,
  Registry,
  registerCoreProfile,
  registerSceneProfile,
} from '@behave-graph/core';

const registry = new Registry();
const logger = new DefaultLogger();
const lifecycleEventEmitter = new ManualLifecycleEventEmitter();
const scene = new DummyScene();

registerCoreProfile(registry, logger, lifecycleEventEmitter);
registerSceneProfile(registry, scene);
```

## Creating a Custom Profile

```ts
import { Registry, ILogger } from '@behave-graph/core';

const registerMyProfile = (
  registry: Registry,
  logger: ILogger,
) => {
  const { nodes, values } = registry;

  // Register nodes
  nodes.register(MyNodeDescription);
  nodes.register(MyNodeWithDependenciesDescription(logger));
    
  // Register value types
  values.register(MyValueTypeDescription);

  return registry;
};
```

