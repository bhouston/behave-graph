---
sidebar_position: 1
---

# Getting Started

## About this project

Behave-Graph is a standalone library that implements the concept of "behavior graphs" as a portable TypeScript library with no required external run-time dependencies. Behavior graphs are expressive, deterministic, and extensible state machines that can encode arbitrarily complex behavior.

Behavior graphs are used extensively in game development as a visual scripting language. For example, look at Unreal Engine Blueprints or Unity's Visual Scripting or NVIDIA Omniverse's OmniGraph behavior graphs.

This library is intended to follow industry best practices in terms of behavior graphs. It is also designed to be compatible with these existing implementations in terms of capabilities. Although, like all node-based systems, behavior graphs are always limited by their node implementations.

Another neat fact about behavior graphs is that they offer a sand boxed execution model. Because one can only execute what is defined by nodes exposed by the host system, you can restrict what can be executed by these graphs. This type of sand-boxing is not possible when you just load and execute arbitrary scripts.

### Features

* **Customizable** While this library contains a lot of nodes, you do not have to expose all of them. For example, just because this supports for-loops and state, does not mean you have to register that node type as being available.
* **Type Safe** This library is implemented in TypeScript and fully makes use of its type safety features.
* **Small** This is a very small library with no external dependencies.
* **Simple** This library is implemented in a forward fashion without unnecessary complexity.
* **High Performance** Currently in performance testing, the library achieves over 2M node executions per second.

### Node Types

* **Events** You can implement arbitrary events that start execution: Start, Tick
* **Actions** You can implement actions that trigger animations, scene scene variations, or update internal state: Log
* **Logic** You can do arithmetic, trigonometry as well as vector operations and string manipulation: Add, Subtract, Multiply, Divide, Pow, Exp, Log, Log2, Log10, Min, Max, Round, Ceil, Floor, Sign, Abs, Trunc, Sqrt, Negate, And, Or, Not, ==, >, >=, <, <=, isNan, isInfinity, concat, includes.
* **Queries** You can query the state from the system.
* **Flow Control** Control execution flow using familiar structures: Branch, Delay, Debounce, Throttle, FlipFlop, Sequence, Gate, MultiGate, DoOnce, DoN, ForLoop
* **Variables** You can create, set and get variable values.
* **Custom Events** You can create, listen to and trigger custom events.

### Designed for Integration into Other Systems

This library is designed to be extended with context dependent nodes, specifically Actions, Events and Queries that match the capabilities and requirements of your system. For example, if you integrate into a 3D engine, you can query for player state or 3D positions of your scene graph, set scene graph properties and also react to overlaps, and player movements. Or if you want to integrate into an AR system, you can react to face-detected, tracking-loss.

## Installation

Get started by **creating a new TypeScript/JavaScript project**.

### What you'll need

- [Node.js](https://nodejs.org/en/download/) version 16.14 or above:
  - When installing Node.js, you are recommended to check all checkboxes related to dependencies.

## Install Behave-Graph

In order to use behave-graph in your project you need to install it from npm:

```bash
npm install @behave-graph/core
```

You can type this command into Command Prompt, Powershell, Terminal, or any other integrated terminal of your code editor.

The command also installs all necessary dependencies you need to run Behave-Graph.