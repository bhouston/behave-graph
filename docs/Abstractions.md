**Abstractions**

Behave-graph is designed as a light weight library that can be plugged into other engines, such as Three.js or Babylon.js.  In order to simplify pluggin into other engines, it defines the functionality required for interfacing with these engines as "abstractions", which can then be implemented by the engines.

This design is inspired by [Hardware Abstraction layers](https://en.wikipedia.org/wiki/Hardware_abstraction) present in operating systems.  HALs, as they are called, are interfaces which are then implemented by drivers that enable that functionality. HALs allow for operating systems to easily be ported to different systems because the machine specific implementations for the operating systems are cordened off from the main operating system behind these HALs.  Behave-graph takes this same approach.

Example abstractions in behave-graph:

* ILogger.  The logging interface allows for behave-graph to report verbose, info, warning and error text messages.  The command line graph-exec tool uses the driver DefaultLogger to output these messages to the console.
* ILifecycleEventEmitter.  This interface is responsible for emitting when the behave-graph should start, tick and stop.
* IScene.  This interface is responsible for doing basic scene manipulations.  In the three example, this interface is implemented by the ThreeScene class that maps these operations to a Three.js-based scene graph.

For example here is the ILogger abstraction, you can see it is just a standard Typescript interface:

``` typescript
export interface ILogger {
  verbose(text: string): void;
  info(text: string): void;
  warn(text: string): void;
  error(text: string): void;
}
```

Here is the DefaultLogger implementation of the abstraction, you can see it is just a standard Typescript class that implements the above interface:

```typescript
/* eslint-disable class-methods-use-this */
import { Logger } from '../../../../Diagnostics/Logger.js';
import { ILogger } from '../ILogger.js';

export class DefaultLogger implements ILogger {
  verbose(text: string): void {
    Logger.verbose(text);
  }

  info(text: string): void {
    Logger.info(text);
  }

  warn(text: string): void {
    Logger.warn(text);
  }

  error(text: string): void {
    Logger.error(text);
  }
}
```

How to register drivers for specific abstractions?  You use the main registry and you register your driver along with specifying the abstraction it supports.  Only a single driver per abstraction interface is supported.

Here is the registration of the DefaultLogger implementation:

```typescript
registry.abstractions.register('ILogger', new DefaultLogger());
```