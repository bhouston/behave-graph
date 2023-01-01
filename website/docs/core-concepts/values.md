---
sidebar_position: 3
---

# Values

Behave-graph supports a pluggable value system where you can easily add new values to the system. Values are what are passed between nodes via sockets.

Values are registered into the central registry as instances of the ValueType class. The value type class controls creation, serialization, deserialization.

```ts
export class ValueType<TValue = any, TJson = any> {
  constructor(
    public readonly name: string,
    public readonly creator: () => TValue,
    public readonly deserialize: (value: TJson) => TValue,
    public readonly serialize: (value: TValue) => TJson
  ) {}
}
```

This ValueType system can support basic types, like string, boolean, integer or float types. For example here is the implementation of the Boolean type:

```ts
new ValueType(
  'boolean',
  () => false,
  (value: string | boolean) =>
    typeof value === 'string' ? value.toLowerCase() === 'true' : value,
  (value: boolean) => value
);
```

It can also be used to register more complex types that have sub-elements to them, such as Vec2, Vec3, Quaternion, Euler and Color. For example, here is the implementation of the Vec3 type:

```ts
new ValueType(
  'vec3',
  () => new Vec3(),
  (value: string | Vec3JSON) =>
    typeof value === 'string'
      ? vec3Parse(value)
      : new Vec3(value.x, value.y, value.z),
  (value) => ({ x: value.x, y: value.y, z: value.z } as Vec3JSON)
);
```

### Future Improvements

Currently the sub-elements of values types are not registered and thus during execution from the point of view of behave-graph, Vec3 is not composed of 3 separate elements of type float. In the future, we may allow for more detailed registration of type internals, but for now this current method works sufficiently well.

## Core Value Types

The Core profile contains the following value types:

- [Boolean](../profiles/Core/Values/boolean)
- [Float](../profiles/Core/Values/float)
- [Integer](../profiles/Core/Values/integer)
- [String](../profiles/Core/Values/string)


## Creating a custom value type

To create a custom value type, you need to create a value type description with serializer and deserializer functions.

```ts
import { ValueType } from '@behave-graph/core';

export const ObjectValue = new ValueType(
  'object',
  () => ({}),
  (value: string | object) =>
    typeof value === 'string' ? JSON.parse(value) : value,
  (value: object) => JSON.stringify(value)
);
````

And register it in the registry.

```ts
values.register(ObjectValue);
```
