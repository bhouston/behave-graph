---
sidebar_position: 4
---

# Nodes

Nodes are the building blocks of the system. They are used to perform operations on the data in the system.

## Types of Nodes

The types of nodes in behave-graph mimic those found in Unreal Engine Blueprints and Unity Visual Scripting.

The different node types have different execution models and are also declared differently. The main two categories of nodes are "flow" nodes, that are nodes who are activate participants in the control flow of the behavior graph, and function nodes, who are evaluated on demand when their results are required by "flow" nodes.

### Function Nodes

Function nodes are the simplest type of node. They do not support "flow" input or output sockets, rather they only have non-flow sockets. These nodes are evaluated on demand when an output of theirs are required. Thes are most often used for mathematical operators, or for queries of context or state.

If there is a network of function nodes, execution proceeds by first evaluating the outer most leaf nodes and then proceeding downwards through the graph until you have evaluated the output sockets of the function nodes you require.

### Basic Flow Nodes

There are a couple types of flow nodes, but the main flow node will take a flow input and also have one or more flow outputs. When it's flow input is triggered, it will evaluate and then synchrously trigger one of its flow outputs, continuing execution of the graph. Most action nodes are basic flow nodes, such as if you want to log a message, or modify a scene graph property. Basic flow nodes can also wait for the downstream execution triggered by its flow output to complete and then do another operation, which is usually to trigger another downstream output flow. Some control flow nodes are basic flow nodes, such as a branch/condition node as well as both the for-loop and sequence nodes (the later two use the basic flow node's ability to wait for the completion of the downstream node graph execution.)

### Event Nodes

Event nodes are nodes that cause execution in the graph to start. They do not have any input "flow" sockets, but they are allow to have non-flow input sockets that may set the parameters for the event node's operation.

Event nodes are all initialized at the start of graph execution. It is expected that after this initialization, the event nodes will trigger their "flow" output sockets when there is an event, and this will happen at any time. These events nodes will not be revisited by the graph execution engine, rather they are assumed to just be active behind the scenes.

### Async Nodes

Async nodes are nodes whom when are triggered will remain activate. They are not synchrous. The simplest example is the delay node. When this node is triggered, it is not required to functionly trigger an output "flow" socket, but rather it can return the trigger function without calling an output. And then later, when it so wants to trigger an output "flow" socket, it can. This can implement a delay node, where you set a timer when the input "flow" socket is triggered and when that timer callback occurs, you can trigger the output "flow" socket.

## Categories

The nodes are also divided into the following categories:

### Event

Event nodes are used to trigger events in the system.

Some examples of event nodes are:

- [lifecycle/onStart](../profiles/Core/Nodes/lifecycle/on-start)
- [lifecycle/onEnd](../profiles/Core/Nodes/lifecycle/on-end)
- [lifecycle/onTick](../profiles/Core/Nodes/lifecycle/on-tick)
- [customEvent/onTriggered](../profiles/Core/Nodes/custom-event/on-triggered)

### Logic

Logic nodes are used to perform logic operations on the data in the system. 

Some examples of logic nodes are:

- [logic/concat/string](../profiles/Core/Nodes/logic/concat/string)
- [logic/includes/string](../profiles/Core/Nodes/logic/includes/string)
- [logic/length/string](../profiles/Core/Nodes/logic/length/string)
- [math/add/float](../profiles/Core/Nodes/math/add/float)
- [math/add/integer](../profiles/Core/Nodes/math/add/integer)
- [math/round/float](../profiles/Core/Nodes/math/round/float)
- [math/toInteger/boolean](../profiles/Core/Nodes/math/to-integer/boolean)
- [math/toString/integer](../profiles/Core/Nodes/math/to-string/integer)

### Variable

Variable nodes are used to store data in the system.

Some examples of variable nodes are:

- [variable/set](../profiles/Core/Nodes/variable/set)
- [variable/get](../profiles/Core/Nodes/variable/get)

### Query

Query nodes are used to query data from the system.

### Action

Action nodes are used to perform actions in the system.

Some examples of action nodes are:

- [customEvent/trigger](../profiles/Core/Nodes/custom-event/trigger)
- [debug/log](../profiles/Core/Nodes/debug/log)

### Flow

Flow nodes are used to control the flow of the system.

Some examples of flow nodes are:

- [flow/branch](../profiles/Core/Nodes/flow/branch)
- [flow/gate](../profiles/Core/Nodes/flow/gate)
- [flow/multiGate](../profiles/Core/Nodes/flow/multi-gate)
- [flow/sequence](../profiles/Core/Nodes/flow/sequence)
- [flow/waitAll](../profiles/Core/Nodes/flow/wait-all)

### Time

Time nodes are used to perform time operations in the system.

Some examples of time nodes are:

- [time/delay](../profiles/Core/Nodes/time/delay)
- [time/now](../profiles/Core/Nodes/time/now)

## Creating a custom node

To create a custom node, you need to create a node description, there are several ways to do this, depending on the kind of node you want to create.

### Constants

If you want to create a node that defines constants, you can use the `NodeDescription` constructor with the `In1Out1FuncNode` helper.

```ts
import {
  In1Out1FuncNode,
  NodeDescription,
} from '@behave-graph/core';

const Constant = new NodeDescription(
  'logic/object',
  'Logic',
  'Object',
  (description, graph) =>
    new In1Out1FuncNode(
      description,
      graph,
      ['object'],
      'object',
      (a: object) => a
    )
);
```

### Binary functions

The same way, if you want to create a node that defines binary functions, you can use the `NodeDescription` constructor with the `In2Out1FuncNode` helper. (There are also `In3Out1FuncNode` and `In4Out1FuncNode` helpers)

```ts
import {
  In2Out1FuncNode,
  NodeDescription,
} from '@behave-graph/core';
import { path } from 'rambdax';

const Path = new NodeDescription(
  'logic/path/object',
  'Logic',
  'Path',
  (description, graph) =>
    new In2Out1FuncNode(
      description,
      graph,
      ['string', 'object'],
      'object',
      (a: string, b: object) => {
        const key = a.split('.');
        return path(key, b);
      },
      ['path', 'object']
    )
);
```

### Flow nodes

If you want to create a flow node, you can extend the `FlowNode` class. In the NodeDescription, you should have a `flow` socket as input and output. Then you should override the `triggered` method, which is called when the node is triggered.

```ts
import {
  Graph,
  FlowNode,
  NodeDescription,
  Socket,
  ILogger,
} from '@behave-graph/core';

class LogObject extends FlowNode {
  public static Description = (logger: ILogger) =>
    new NodeDescription(
      'debug/log/object',
      'Action',
      'Log',
      (description, graph) => new LogObject(description, graph, logger)
    );

  constructor(
    description: NodeDescription,
    graph: Graph,
    private readonly logger: ILogger
  ) {
    super(
      description,
      graph,
      [
        new Socket('flow', 'flow'),
        new Socket('string', 'text'),
        new Socket('string', 'severity', 'info'),
        new Socket('object', 'payload'),
      ],
      [new Socket('flow', 'flow')]
    );
  }

  override triggered(fiber: any) {
    const text = this.readInput<string>('text');
    const payload = this.readInput<any>('payload');

    const message = `${text} ${JSON.stringify(payload)}`;

    switch (this.readInput<string>('severity')) {
      case 'verbose':
        this.logger.verbose(message);
        break;
      case 'info':
        this.logger.info(message);
        break;
      case 'warning':
        this.logger.warn(message);
        break;
      case 'error':
        this.logger.error(message);
        break;
    }

    fiber.commit(this, 'flow');
  }
}
```

### Async Nodes

Async Nodes are similar to Flow Nodes, but in this case you need to extend the AsyncNode class. You should also control the internal state of the node, and call the `engine.commitToNewFiber(this, 'flow')` and `finished()` methods when the node is done.

```ts
import {
  AsyncNode,
  Engine,
  Graph,
  NodeDescription,
  Socket,
} from '@behave-graph/core';
import { JSONTemplateEngine } from 'json-template-engine';

export type ITemplateEngineFactory = () => JSONTemplateEngine;

export class Template extends AsyncNode {
  public static Description = (templateEngineFactory: ITemplateEngineFactory) =>
    new NodeDescription(
      'logic/template/object',
      'Logic',
      'Template',
      (description, graph) => new Template(description, graph, engine)
    );

  constructor(
    description: NodeDescription,
    graph: Graph,
    private readonly templateEngineFactory: ITemplateEngineFactory
  ) {
    super(
      description,
      graph,
      [
        new Socket('flow', 'flow'),
        new Socket('object', 'template', ''),
        new Socket('object', 'data', ''),
      ],
      [new Socket('flow', 'flow'), new Socket('object', 'result', '')]
    );
  }

  private templateIsRendering = false;

  override triggered(
    engine: Engine,
    triggeringSocketName: string,
    finished: () => void
  ) {
    // if there is a valid rendering running, leave it.
    if (this.templateIsRendering) {
      return;
    }

    const parser = this.templateEngineFactory();
    this.templateIsRendering = true;

    parser
      .compile(this.readInput('template'), this.readInput('data'))
      .then((result) => {
        // check if cancelled
        if (!this.templateIsRendering) return;
        this.templateIsRendering = false;

        const output = this.outputSockets.find((s) => s.name === 'result');
        if (output) {
          output.value = result;
        }

        engine.commitToNewFiber(this, 'flow');
        finished();
      });
  }

  override dispose() {
    this.templateIsRendering = false;
  }
}
```