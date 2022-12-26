---
sidebar_position: 1
---

# Registry

The registry is a collection of all the nodes and value types that are available in the system.

In order to add a node or value type to the registry, you need to use the register function, usually inside your [profile's register function](./profiles.md).


```ts
import { Registry } from '@behave-graph/core';

const registry = new Registry();

const { nodes, values } = registry;

// Register a value type
values.register(MyValueTypeDescription);

// Register a node
nodes.register(MyNodeDescription);
```