# Behave-Graph

[![GitHub license](https://img.shields.io/npm/l/behave-graph)](https://github.com/bhouston/behave-graph/blob/main/LICENSE) [![npm version](https://img.shields.io/npm/v/behave-graph)](https://www.npmjs.com/package/behave-graph)

Behave-Graph is a standalone library that implements the concept of "behavior graphs" as a portable TypeScript library with no required external run-time dependencies.  Behavior graphs are expressive, deterministic, and extensible state machines that can encode arbitrarily complex behavior.

Behavior graphs are used extensively in game development as a visual scripting language.  For example, look at Unreal Engine Blueprints or Unity's Visual Scripting or NVIDIA Omniverse's OmniGraph behavior graphs.

This library is intended to follow industry best practices in terms of behavior graphs.  It is also designed to be compatible with these existing implementations in terms of capabilities.  Although, like all node-based systems, behavior graphs are always limited by their node implementations.

Another neat fact about behavior graphs is that they offer a sand boxed execution model.  Because one can only execute what is defined by nodes exposed by the host system, you can restrict what can be executed by these graphs.  This type of sand-boxing is not possible when you just load and execute arbitrary scripts.

## Community Resources

You can join our Discord here:

https://discord.gg/mrags8WyuH

@beeglebug has started an amazing interactive React node graph editor for behave-graph here:

https://github.com/beeglebug/behave-flow

## Feature Overview

This library, while small, contains a nearly complete implementation of behavior graphs.

### Features:
* **Customizable** While this library contains a lot of nodes, you do not have to expose all of them.  For example, just because this supports for-loops and state, does not mean you have to register that node type as being available.
* **Type Safe** This library is implemented in TypeScript and fully makes use of its type safety features.
* **Small** This is a very small library with no external dependencies.
* **Simple** This library is implemented in a forward fashion without unnecessary complexity.
* **High Performance** Currently in performance testing, the library achieves over 2M node executions per second.
### Node Types:
* **Events** You can implement arbitrary events that start execution: Start, Tick
* **Actions** You can implement actions that trigger animations, scene scene variations, or update internal state: Log
* **Logic** You can do arithmetic, trigonometry as well as vector operations and string manipulation: Add, Subtract, Multiply, Divide, Pow, Exp, Log, Log2, Log10, Min, Max, Round, Ceil, Floor, Sign, Abs, Trunc, Sqrt, Negate, And, Or, Not, ==, >, >=, <, <=, isNan, isInfinity, concat, includes.
* **Queries** You can query the state from the system.
* **Flow Control** Control execution flow using familiar structures: Branches, delays, if-then, sequences and for-loops.
* **State** You can set and load state arbitrarily: Set, Get.
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
npm run exec-graph -- ./examples/[examplename].json
```

Here are some example graphs in their native JSON form:
### Hello World

Print out the text "Hello World!" as soon as the graph starts up!

```json
[
    {
        "type": "lifecycle/start"
    },
    {
        "type": "action/log",
        "inputs": {
            "flow": { "links": [ { "node": 0, "socket": "flow" } ] },
            "text": { "value": "Hello World!" }
        }
    }
]
```

Console output:

```zsh
> npm run exec-graph -- ./examples/core/HelloWorld.json

Hello World!
```

### Setting and Reading Variables

In this example, we use a pre-declared variable called "counter" to 1000 and then later read it and print it out.

```json
[
    {
        "type": "lifecycle/start",
        "id": "0"
    },
    {
        "type": "state/setNumber",
        "id": "1",
        "inputs": {
            "flow": {
                "links": [
                    {
                        "nodeId": "0",
                        "socket": "flow"
                    }
                ]
            },
            "variable": {
                "value": "0"
            },
            "value": {
                "value": 1000
            }
        }
    },
    {
        "type": "state/getNumber",
        "id": "2",
        "inputs": {
            "variable": {
                "value": "0"
            }
        }
    },
    {
        "type": "logic/numberToString",
        "id": "3",
        "inputs": {
            "a": {
                "links": [
                    {
                        "nodeId": "2",
                        "socket": "result"
                    }
                ]
            }
        }
    },
    {
        "type": "action/log",
        "id": "4",
        "inputs": {
            "flow": {
                "links": [
                    {
                        "nodeId": "1",
                        "socket": "flow"
                    }
                ]
            },
            "text": {
                "links": [
                    {
                        "nodeId": "3",
                        "socket": "result"
                    }
                ]
            }
        }
    }
]
```

Console output:

```zsh
> npm run exec-graph -- ./examples/core/variables/GetSet.json

1000
```

### Branching

This example shows how to branching execution works. The "flow/branch" node has two flow outputs, "true" and "false".  The value of it's "condition" input determines the path of execution.

```json
[
    {
        "type": "lifecycle/start"
    },
    {
        "type": "flow/branch",
        "inputs": {
            "flow": { "links": [ { "node": 0, "socket": "flow" } ] },
            "condition": { "value": false }
        }
    },
    {
        "type": "action/log",
        "inputs": {
            "flow": { "links": [ { "node": 1, "socket": "true" } ] },
            "text": { "value": "Condition is true!" }
        }
    },
    {
        "type": "action/log",
        "inputs": {
            "flow": { "links": [ { "node": 1, "socket": "false" } ] },
            "text": { "value": "Condition is false!" }
        }
    }
]
```

Console output:

```zsh
> npm run exec-graph -- ./examples/core/flow/Branch.json

Condition is false!
```

### Polynomial Math Formula

This shows how to create math formulas in logic nodes.  In this case the equation is: ( a^1 * 3 + a^2 + (-a^3) ), where a = 3.  The answer is -9.

```json
[
    {
        "type": "lifecycle/start"
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
            "a": { "links": [ { "node": 1, "socket": "result" } ] },
            "b": { "value": 1 }
        }
    },
    {
        "type": "logic/numberPow",
        "inputs": {
            "a": { "links": [ { "node": 1, "socket": "result" } ] },
            "b": { "value": 2 }
        }
    },
    {
        "type": "logic/numberPow",
        "inputs": {
            "a": { "links": [ { "node": 1, "socket": "result" } ] },
            "b": { "value": 3 }
        }
    },
    {
        "type": "logic/numberMultiply",
        "inputs": {
            "a": { "links": [ { "node": 2, "socket": "result" } ] },
            "b": { "value": 3 }
        }
    },
    {
        "type": "logic/numberAdd",
        "inputs": {
            "a": { "links": [ { "node": 5, "socket": "result" } ] },
            "b": { "links": [ { "node": 3, "socket": "result" } ] }
        }
    },
    {
        "type": "logic/numberNegate",
        "inputs": {
            "a": { "links": [ { "node": 4, "socket": "result" } ] },
            "b": { "value": 10 }
        }
    },
    {
        "type": "logic/numberAdd",
        "inputs": {
            "a": { "links": [ { "node": 6, "socket": "result" } ] },
            "b": { "links": [ { "node": 7, "socket": "result" } ] }
        }
    },
    {
        "type": "logic/numberToString",
        "inputs": {
            "a": { "links": [ { "node": 8, "socket": "result" } ] }
        }
    },
    {
        "type": "action/log",
        "inputs": {
            "flow": { "links": [ { "node": 0, "socket": "flow" } ] },
            "text": { "links": [ { "node": 9, "socket": "result" } ]}
        }
    }
]
```

Console output:

```zsh
> npm run exec-graph -- ./examples/core/logic/Math.json

-9
```

### Asynchronous Execution

Behave-Graph support asynchronous nodes.  These are nodes which will continue execution non-immediately but on their own self-determined schedule.  This allows for things such as "Delay" nodes that can sleep for a period of time.

```json
[
    {
        "type": "lifecycle/start"
    },
    {
        "type": "action/log",
        "inputs": {
            "flow": { "links": [ { "node": 0, "socket": "flow" } ] },
            "text": { "value": "Waiting..." }
        }
    },
    {
        "type": "time/delay",
        "inputs": {
            "flow": { "links": [ { "node": 1, "socket": "flow" } ] },
            "duration": { "value": 1 }
        }
    },
    {
        "type": "action/log",
        "inputs": {
            "flow": { "links": [ { "node": 2, "socket": "flow" } ] },
            "text": { "value": "One Second Later!" }
        }
    }
]
```

Console output:

```zsh
> npm run exec-graph -- ./examples/core/async/Delay.json

Waiting...
One Second Later!
```

### Sequences

Behave-Graph support waiting for the completion of downstream nodes.  This allows for "Sequence" nodes which will execute a series of flow outputs in order.

```json
[
    {
        "type": "lifecycle/start",
        "id": "0"
    },
    {
        "type": "action/log",
        "id": "1",
        "inputs": {
            "flow": {
                "links": [
                    {
                        "nodeId": "0",
                        "socket": "flow"
                    }
                ]
            },
            "text": {
                "value": "Starting Sequence..."
            }
        }
    },
    {
        "type": "flow/sequence",
        "id": "2",
        "inputs": {
            "flow": {
                "links": [
                    {
                        "nodeId": "1",
                        "socket": "flow"
                    }
                ]
            }
        }
    },
    {
        "type": "action/log",
        "id": "3",
        "inputs": {
            "flow": {
                "links": [
                    {
                        "nodeId": "2",
                        "socket": "1"
                    }
                ]
            },
            "text": {
                "value": "First Sequence Output!"
            }
        }
    },
    {
        "type": "action/log",
        "id": "4",
        "inputs": {
            "flow": {
                "links": [
                    {
                        "nodeId": "2",
                        "socket": "2"
                    }
                ]
            },
            "text": {
                "value": "Second Sequence Output!"
            }
        }
    },
    {
        "type": "action/log",
        "id": "5",
        "inputs": {
            "flow": {
                "links": [
                    {
                        "nodeId": "2",
                        "socket": "3"
                    }
                ]
            },
            "text": {
                "value": "Third Sequence Output!"
            }
        }
    }
]
```

Console output:

```zsh
> npm run exec-graph -- ./examples/core/flow/Sequence.json

Starting Sequence...
First Sequence Output!
Second Sequence Output!
Third Sequence Output!
```

### For Loops

Building upon waiting for downstream nodes to execute, you can also execute For Loops within Behave-Graph.

```json
[
    {
        "type": "lifecycle/start",
        "id": "0"
    },
    {
        "type": "action/log",
        "id": "1",
        "inputs": {
            "flow": {
                "links": [
                    {
                        "nodeId": "0",
                        "socket": "flow"
                    }
                ]
            },
            "text": {
                "value": "Starting For Loop..."
            }
        }
    },
    {
        "type": "flow/forLoop",
        "id": "2",
        "inputs": {
            "startIndex": {
                "value": 0
            },
            "endIndex": {
                "value": 10
            },
            "flow": {
                "links": [
                    {
                        "nodeId": "1",
                        "socket": "flow"
                    }
                ]
            }
        }
    },
    {
        "type": "action/log",
        "id": "3",
        "inputs": {
            "flow": {
                "links": [
                    {
                        "nodeId": "2",
                        "socket": "loopBody"
                    }
                ]
            },
            "text": {
                "value": "Loop Body!"
            }
        }
    },
    {
        "type": "action/log",
        "id": "4",
        "inputs": {
            "flow": {
                "links": [
                    {
                        "nodeId": "2",
                        "socket": "completed"
                    }
                ]
            },
            "text": {
                "value": "Completed For Loop!"
            }
        }
    }
]
```

Console output:

```zsh
> npm run exec-graph -- ./examples/core/flow/ForLoop.json

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

```json
{
    "customEvents": [
        {
            "name": "myCustomEvent",
            "id": "0"
        }
    ],
    "nodes": [
        {
            "type": "lifecycle/tick",
            "id": "0"
        },
        {
            "type": "action/triggerCustomEvent",
            "id": "1",
            "inputs": {
                "flow": {
                    "links": [
                        {
                            "nodeId": "0",
                            "socket": "flow"
                        }
                    ]
                },
                "customEvent": {
                    "value": "0"
                }
            }
        },
        {
            "type": "event/customEvent",
            "id": "2",
            "inputs": {
                "customEvent": {
                    "value": "0"
                }
            }
        },
        {
            "type": "action/log",
            "id": "3",
            "inputs": {
                "flow": {
                    "links": [
                        {
                            "nodeId": "2",
                            "socket": "flow"
                        }
                    ]
                },
                "text": {
                    "value": "myCustomEvent Fired!"
                }
            }
        }
    ]
}
```

Console output:

```zsh
> npm run exec-graph -- ./examples/core/events/CustomEvents.json

myCustomEvent Fired!
myCustomEvent Fired!
myCustomEvent Fired!
myCustomEvent Fired!
myCustomEvent Fired!
```

# Performance Testing

Here is a test of 1,000,000 millions:

```json
{
    "nodes": [
        {
            "type": "lifecycle/start",
            "id": "0"
        },
        {
            "type": "action/log",
            "id": "1",
            "inputs": {
                "flow": {
                    "links": [
                        {
                            "nodeId": "0",
                            "socket": "flow"
                        }
                    ]
                },
                "text": {
                    "value": "Starting 10,000,000 iteration for-loop..."
                }
            }
        },
        {
            "type": "flow/forLoop",
            "id": "2",
            "inputs": {
                "startIndex": {
                    "value": 0
                },
                "endIndex": {
                    "value": 10000000
                },
                "flow": {
                    "links": [
                        {
                            "nodeId": "1",
                            "socket": "flow"
                        }
                    ]
                }
            }
        },

        {
            "type": "logic/numberModulus",
            "id": "3",
            "inputs": {
                "a": {
                    "links": [
                        {
                            "nodeId": "2",
                            "socket": "index"
                        }
                    ]
                },
                "b": {
                    "value": 1000000
                }
            }
        },

        {
            "type": "logic/numberEqual",
            "id": "4",
            "inputs": {
                "a": {
                    "links": [
                        {
                            "nodeId": "3",
                            "socket": "result"
                        }
                    ]
                },
                "b": {
                    "value": 0
                }
            }
        },
        {
            "type": "flow/branch",
            "id": "5",
            "inputs": {
                "flow": {
                    "links": [
                        {
                            "nodeId": "2",
                            "socket": "loopBody"
                        }
                    ]
                },
                "condition": {
                    "links": [
                        {
                            "nodeId": "4",
                            "socket": "result"
                        }
                    ]
                }
            }
        },
        {
            "type": "action/log",
            "id": "6",
            "inputs": {
                "flow": {
                    "links": [
                        {
                            "nodeId": "5",
                            "socket": "true"
                        }
                    ]
                },
                "text": {
                    "value": "1,000,000 more iterations..."
                }
            }
        },
        {
            "type": "action/log",
            "id": "7",
            "inputs": {
                "flow": {
                    "links": [
                        {
                            "nodeId": "2",
                            "socket": "completed"
                        }
                    ]
                },
                "text": {
                    "value": "Completed all iterations!"
                }
            }
        }
    ]
}
```

Here is the console output:

```zsh
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

    20000016 nodes executed in 9.092 seconds, at a rate of 2199738 steps/second
```

