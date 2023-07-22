# Behave-Graph

[![GitHub license](https://img.shields.io/npm/l/behave-graph)](https://github.com/bhouston/behave-graph/blob/main/LICENSE) [![npm version](https://img.shields.io/npm/v/@behave-graph/core)](https://www.npmjs.com/package/@behave-graph/core)

Behave-Graph is a standalone library that implements the concept of "behavior graphs" as a portable TypeScript library with no required external run-time dependencies. Behavior graphs are expressive, deterministic, and extensible state machines that can encode arbitrarily complex behavior.

Behavior graphs are used extensively in game development as a visual scripting language. For example, look at Unreal Engine Blueprints or Unity's Visual Scripting or NVIDIA Omniverse's OmniGraph behavior graphs.

This library is intended to follow industry best practices in terms of behavior graphs. It is also designed to be compatible with these existing implementations in terms of capabilities. Although, like all node-based systems, behavior graphs are always limited by their node implementations.

Another neat fact about behavior graphs is that they offer a sand boxed execution model. Because one can only execute what is defined by nodes exposed by the host system, you can restrict what can be executed by these graphs. This type of sand-boxing is not possible when you just load and execute arbitrary scripts.

## Documentation

- [Extending the Value System](/docs/Values.md)
- [Types Of Nodes](/docs/TypesOfNodes.md)
- [Abstractions and Drivers](/docs/Abstractions.md)

## Community Resources

You can join our Discord here:

<https://discord.gg/mrags8WyuH>

## Feature Overview

This library, while small, contains a nearly complete implementation of behavior graphs along with extensions for 3D math types and scenes. It also contained a graph editor React library.

### Features

- **Customizable** While this library contains a lot of nodes, you do not have to expose all of them. For example, just because this supports for-loops and state, does not mean you have to register that node type as being available.
- **Type Safe** This library is implemented in TypeScript and fully makes use of its type safety features.
- **Small** This is a very small library with no external dependencies.
- **Simple** This library is implemented in a forward fashion without unnecessary complexity.
- **High Performance** Currently in performance testing, the library achieves over 2M node executions per second.

### Node Types

- **Events** You can implement arbitrary events that start execution: Start, Tick
- **Actions** You can implement actions that trigger animations, scene scene variations, or update internal state: Log
- **Logic** You can do arithmetic, trigonometry as well as vector operations and string manipulation: Add, Subtract, Multiply, Divide, Pow, Exp, Log, Log2, Log10, Min, Max, Round, Ceil, Floor, Sign, Abs, Trunc, Sqrt, Negate, And, Or, Not, ==, >, >=, <, <=, isNan, isInfinity, concat, includes.
- **Queries** You can query the state from the system.
- **Flow Control** Control execution flow using familiar structures: Branch, Delay, Debounce, Throttle, FlipFlop, Sequence, Gate, MultiGate, DoOnce, DoN, ForLoop
- **Variables** You can create, set and get variable values.
- **Custom Events** You can create, listen to and trigger custom events.

### Designed for Integration into Other Systems

This library is designed to be extended with context dependent nodes, specifically Actions, Events and Queries that match the capabilities and requirements of your system. For example, if you integrate into a 3D engine, you can query for player state or 3D positions of your scene graph, set scene graph properties and also react to overlaps, and player movements. Or if you want to integrate into an AR system, you can react to face-detected, tracking-loss.

## Developer Setup

Install all dependencies:

```zsh
npm install
```

To do a full development build with hot reloading and a built-in dev server (via vite) run:

```zsh
npm run dev
```

If you are curious about the monorepository setup, you can read more about it here:

https://github.com/bhouston/template-modern-typescript-monorepo

## Command Line Examples

The example behavior graphs are in the `/examples` folder. You can execute these from the command line to test out how this library works.

The main syntax is this one:

```zsh
npx exec-graph ./graphs/[examplename].json
```

Here are some example graphs in their native JSON form:

### Hello World

Print out the text "Hello World!" as soon as the graph starts up!

[/graphs/core/HelloWorld.json](/graphs/core/HelloWorld.json)

Console output:

```sh
npx exec-graph ./graphs/core/HelloWorld.json
```

Console output:

```sh
Hello World!
```

### Setting, Reading, And Listening to Variables

In this example, we use set a variable and also listen to when it changes.

[/graphs/variables/Changed.json](/graphs/variables/Changed.json)

Console output:

```sh
npx exec-graph ./graphs/core/variables/Changed.json
```

Console output:

```sh
391
```

### Branching

This example shows how to branching execution works. The "flow/branch" node has two flow outputs, "true" and "false". The value of it's "condition" input determines the path of execution.

[/graphs/core/flow/Branch.json](/graphs/core/flow/Branch.json)

Command:

```sh
npx exec-graph ./graphs/core/flow/Branch.json
```

Console output:

```sh
Condition is false!
```

### Polynomial Math Formula

This shows how to create math formulas in logic nodes. In this case the equation is: ( a^1 \* 3 + a^2 + (-a^3) ), where a = 3. The answer is -9.

[/graphs/core/logic/Polynomial.json](/graphs/core/logic/Polynomial.json)

Command:

```sh
npx exec-graph ./graphs/core/logic/Polynomial.json
```

Console output:

```sh
-9
```

### Asynchronous Execution

Behave-Graph support asynchronous nodes. These are nodes which will continue execution non-immediately but on their own self-determined schedule. This allows for things such as "Delay" nodes that can sleep for a period of time.

[/graphs/core/async/Delay.json](/graphs/core/async/Delay.json)

Command:

```sh
npx exec-graph ./graphs/core/async/Delay.json
```

Console output:

```sh
Waiting...
One Second Later!
```

### For Loops

Building upon waiting for downstream nodes to execute, you can also execute For Loops within Behave-Graph.

[/graphs/core/flow/ForLoop.json](/graphs/core/flow/ForLoop.json)

Command:

```sh
npx exec-graph ./graphs/core/flow/ForLoop.json
```

Console output:

```sh
Starting For Loop...
Loop Body!
Loop Body!
Loop Body!
Loop Body!
Loop Body!
Loop Body!
Loop Body!
Loop Body!
Loop Body!
Loop Body!
Completed For Loop!
```

# Custom Events

You can register custom events, trigger then and listen on them.

[/graphs/core/events/CustomEvents.json](/graphs/core/events/CustomEvents.json)

Console output:

```sh
npx exec-graph ./graphs/core/events/CustomEvents.json
```

Console output:

```sh
myCustomEvent Fired!
myCustomEvent Fired!
myCustomEvent Fired!
myCustomEvent Fired!
myCustomEvent Fired!
```

# Performance Testing

Here is a test of 10,000,000 iteration for loop:

[/graphs/core/flow/PerformanceTest.json](/graphs/core/flow/PerformanceTest.json)

Here is the command running with verbose logging, e.g. "-l 0":

```sh
npx exec-graph ./graphs/core/flow/PerformanceTest.json -l 0
```

Console output:

```sh
Starting 10,000,000 iteration for-loop...
1,000,000 more iterations...
1,000,000 more iterations...
1,000,000 more iterations...
1,000,000 more iterations...
1,000,000 more iterations...
1,000,000 more iterations...
1,000,000 more iterations...
1,000,000 more iterations...
1,000,000 more iterations...
1,000,000 more iterations...
Completed all iterations!

  Profile Results: 30000014 nodes executed in 2.742 seconds, at a rate of 10940924 steps/second
```
