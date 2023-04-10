# Behave-Graph Execution Pseudocode

Based nearly exactly from http://github.com/bhouston/behave-graph, specifically these files:

* https://github.com/bhouston/behave-graph/blob/main/packages/core/src/Execution/Engine.ts
* https://github.com/bhouston/behave-graph/blob/main/packages/core/src/Execution/Fiber.ts
* https://github.com/bhouston/behave-graph/blob/main/packages/core/src/Execution/resolveSocketValue.ts

## Data Structures

### Engine
The main data structure that executes a graph.  It is assumed each each graph has its own engine:

1. Fiber queue - A queue of synchronous execution threads, which are called Fibers, in which it will execute in a FIFO order.
1. Pending async node list - a list of the async nodes that have begun execution but have not marked themselves as completed.  While there are nodes in the async pending list, we know that all execution is not complete.

### Fiber

The main data structure for tracking a synchronous execution thread.  It has the following state:

1. Next Link - the link from the output flow socket from the node that just executed to the next flow node’s input flow socket.
1. CompletedListenerStack - a stack of callbacks, of which only the most recent one is to be triggered when there is no next link to execute.

# Graph execution.

## Resolving Input Socket Values

Resolve Input Socket Value:

* If there exists an explicit constant value set on the input socket
  * Return the explicit constant value.
* Otherwise follow link to output socket.
  * If the output socket node is a flow node (which includes event nodes, basic flow nodes and async flow nodes)
    * Return the output socket value.
  * Otherwise output socket node must be a function node:
    * Execute the function node.
    * Return the output socket value.

(The above can be optimized via linearizing the function nodes so that they are only executed once.  Or one can mark it with each execution, sort of like a mark/sleep approach.)

## New Event

The only way execution can begin:
* Upon the triggering of an output flow socket from an event node:
  * Enqueues a new fiber and sets its next link to be the one from the output flow socket from the event node.

## Engine Step

For the first fiber in the queue:

* If fiber “Next Link” is null, e.g. no waiting synchronous flow nodes.
  * Pop off a completed listener from the completed listener stack and execute the callback.
  * Return.
* Otherwise follow the next link to the flow node of the output socket.
  * For each non-flow input socket:
    * Resolving input socket (see above)
  * If node is async
    * Add node to list of pending async nodes.
    * Trigger async node execution with onCompletion callback that:
      * Removes node from list of pending async nodes.
  * Otherwise
    * Trigger sync node execution.

# Node Execution

All nodes when executing can read from their input socket values and write to their output socket values.  All nodes can also read their configuration state.  Nodes can not access global graph structure, or query which nodes are upstream or downstream from them.

## Function

Inputs: None

Outputs: Node

The function node can read its input socket values, make a calculation and then write to their output sockets.

## Flow Nodes

### Asynchronous Flow

Inputs: triggerAsyncOutputSocket function (which takes an onCompletion callback), triggeringInputSocket, onCompletion callback.

The node can call triggerAsyncOutputSocket as many times as it wants and then it should fire onCompletion callback to notify the engine it is done.
An asynchronous flow node can only have a single instance of itself per graph instance pending.  Thus if a delay node is triggered a second time while it is currently already pending, it will not execute.

### Synchronous Flow

Inputs: triggerSyncOutputSocket function (which takes an onCompletion callback), triggeringSocket

The node can trigger multiple triggerSyncOutputSocket functions but only by submitting a onCompletion callback that ensures that the calls are done synchronously.






