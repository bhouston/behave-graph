## Behavior-Graph

Behavior-Graph is a standalone library that implements the concept of "behavior graphs" as a portable TypeScript library with no external run-time dependencies.  Behavior graphs
are expressive, deterministic, and extensible state machines that can encode arbitrarily complex behavior.

Behavior Graphs are used extensively in game development as a visual scripting language.  For example, look at Unreal Engine Blueprints or Unity's Visual Scripting or NVIDIA Omniverse's OmniGraph behavior graphs.

This library is intended to follow industry best practices in terms of behavior-graphs and is intended to be compatible with these existing implementations in terms of capabilities.  Although behavior-graphs are always limited by their node implementations.

Another neat fact about behavior-graphs is that they offer a sand boxed execution model.  Because one can only execute what is defined by nodes exposed by the host system, you can restrict what can be executed by these graphs.  This type of sand-boxing is not possible when you just load and execute arbitrary scripts.
## Feature Overview

This library, while small, contains a nearly complete implementation of behavior-graphs.

### Features:
* **Customizable** While this library contains a lot of nodes, you do not have to expose all of them.  For example, just because this supports for-loops and state, does not mean you have to register that node type as being available.
* **Type Safe** This library is implemented in TypeScript and fully makes use of its type safety features.
* **Small** This is a very small library with no external dependencies.
* **Simple** This library is implemented in a forward fashion without unnecessary complexity.

### Node Types:
* **Events** You can implement arbitrary events that start execution: Start, Tick
* **Actions** You can implement actions that trigger animations, scene scene variations, or update internal state: Log
* **Logic** You can do arithmetic, trigonometry as well as vector operations and string manipulation: Add, Subtract, Multiply, Divide, Pow, Exp, Log, Log2, Log10, Min, Max, Round, Ceil, Floor, Sign, Abs, Trunc, Sqrt, Negate, And, Or, Not, ==, >, >=, <, <=, isNan, isInfinity, concat, includes.
* **Queries** You can query the state from the system.
* **Flow Control** Control execution flow using familiar structures: Branches, delays, if-then, sequences and for-loops.
* **State** You can set and load state arbitrarily: Exists, Set, Get.
* **Time** Time nodes allow you to wait: Delay.
### Designed for Integration into Other Systems

This library is designed to be extended with context dependent nodes, specifically Actions, Events and Queries that match the capabilities and requirements of your system.  For example, if you integrate into a 3D engine, you can query for player state or 3D positions of your scene graph, set scene graph properties and also react to overlaps, and player movements.  Or if you want to integrate into an AR system, you can react to face-detected, tracking-loss.
## Command Line Usage
### Building

After cloning out this git project locally, run the following:

```zsh
npm install
npm run build
```

## Examples

The example behavior graphs are in the ```/examples``` folder.  You can execute these from the command line to test out how this library works.

The main syntax is this one:
```zsh
npm run exec -- ./examples/[examplename].json
```

Here are some example graphs in their native JSON form:
### Hello World

Print out the text "Hello World!" as soon as the graph starts up!

```json
[
    {
        "type": "event/start"
    },
    {
        "type": "action/log",
        "inputs": {
            "flow": { "links": [ { "nodeIndex": 0, "socketName": "flow" } ] },
            "text": { "value": "Hello World!" }
        }
    }
]
```

Console output:

```zsh
> npm run exec -- ./examples/basics/HelloWorld.json

Hello World!
```

### Setting and Reading State

In this example, we set a state variable called "counter" to 1000 and then later read it and print it out.

```json
[
    {
        "type": "event/start"
    },
    {
        "type": "state/setNumber",
        "inputs": {
            "flow": { "links": [ { "nodeIndex": 0, "socketName": "flow" } ] },
            "identifier": { "value": "counter"},
            "value": { "value": 1000 }
        }
    },
    {
        "type": "state/getNumber",
        "inputs": {
            "identifier": { "value": "counter" }
        }
    },
    {
        "type": "logic/numberToString",
        "inputs": {
            "a": { "links": [ { "nodeIndex": 2, "socketName": "result" } ]  }
        }
    },
    {
        "type": "action/log",
        "inputs": {
            "flow": { "links": [ { "nodeIndex": 1, "socketName": "flow" } ] },
            "text": { "links": [ { "nodeIndex": 3, "socketName": "result" } ]  }
        }
    }
]
```

Console output:

```zsh
> npm run exec -- ./examples/basics/State.json

1000
```

### Branching

This example shows how to branching execution works. The "flow/branch" node has two flow outputs, "true" and "false".  The value of it's "condition" input determines the path of execution.

```json
[
    {
        "type": "event/start"
    },
    {
        "type": "flow/branch",
        "inputs": {
            "flow": { "links": [ { "nodeIndex": 0, "socketName": "flow" } ] },
            "condition": { "value": false }
        }
    },
    {
        "type": "action/log",
        "inputs": {
            "flow": { "links": [ { "nodeIndex": 1, "socketName": "true" } ] },
            "text": { "value": "Condition is true!" }
        }
    },
    {
        "type": "action/log",
        "inputs": {
            "flow": { "links": [ { "nodeIndex": 1, "socketName": "false" } ] },
            "text": { "value": "Condition is false!" }
        }
    }
]
```

Console output:

```zsh
> npm run exec -- ./examples/basics/Branch.json

Condition is false!
```

### Polynomial Math Formula

This shows how to create math formulas in logic nodes.  In this case the equation is: ( a^1 * 3 + a^2 + (-a^3) ), where a = 3.  The answer is -9.

```json
[
    {
        "type": "event/start"
    },
    {
        "type": "logic/numberConstant",
        "inputs": {
            "a": { "value": 3 }
        }
    },
    {
        "type": "logic/numberPow",
        "inputs": {
            "a": { "links": [ { "nodeIndex": 1, "socketName": "result" } ] },
            "b": { "value": 1 }
        }
    },
    {
        "type": "logic/numberPow",
        "inputs": {
            "a": { "links": [ { "nodeIndex": 1, "socketName": "result" } ] },
            "b": { "value": 2 }
        }
    },
    {
        "type": "logic/numberPow",
        "inputs": {
            "a": { "links": [ { "nodeIndex": 1, "socketName": "result" } ] },
            "b": { "value": 3 }
        }
    },
    {
        "type": "logic/numberMultiply",
        "inputs": {
            "a": { "links": [ { "nodeIndex": 2, "socketName": "result" } ] },
            "b": { "value": 3 }
        }
    },
    {
        "type": "logic/numberAdd",
        "inputs": {
            "a": { "links": [ { "nodeIndex": 5, "socketName": "result" } ] },
            "b": { "links": [ { "nodeIndex": 3, "socketName": "result" } ] }
        }
    },
    {
        "type": "logic/numberNegate",
        "inputs": {
            "a": { "links": [ { "nodeIndex": 4, "socketName": "result" } ] },
            "b": { "value": 10 }
        }
    },
    {
        "type": "logic/numberAdd",
        "inputs": {
            "a": { "links": [ { "nodeIndex": 6, "socketName": "result" } ] },
            "b": { "links": [ { "nodeIndex": 7, "socketName": "result" } ] }
        }
    },
    {
        "type": "logic/numberToString",
        "inputs": {
            "a": { "links": [ { "nodeIndex": 8, "socketName": "result" } ] }
        }
    },
    {
        "type": "action/log",
        "inputs": {
            "flow": { "links": [ { "nodeIndex": 0, "socketName": "flow" } ] },
            "text": { "links": [ { "nodeIndex": 9, "socketName": "result" } ]}
        }
    }
]
```

Console output:

```zsh
> npm run exec -- ./examples/basics/Math.json

-9
```

### Asynchronous Execution

Behavior-Graph support asynchronous nodes.  These are nodes which will continue execution non-immediately but on their own self-determined schedule.  This allows for things such as "Delay" nodes that can sleep for a period of time.

```json
[
    {
        "type": "event/start"
    },
    {
        "type": "action/log",
        "inputs": {
            "flow": { "links": [ { "nodeIndex": 0, "socketName": "flow" } ] },
            "text": { "value": "Waiting..." }
        }
    },
    {
        "type": "time/delay",
        "inputs": {
            "flow": { "links": [ { "nodeIndex": 1, "socketName": "flow" } ] },
            "duration": { "value": 1 }
        }
    },
    {
        "type": "action/log",
        "inputs": {
            "flow": { "links": [ { "nodeIndex": 2, "socketName": "flow" } ] },
            "text": { "value": "One Second Later!" }
        }
    }
]
```

Console output:

```zsh
> npm run exec -- ./examples/basics/Delay.json

Waiting...
One Second Later!
```
