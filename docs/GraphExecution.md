**Graph Execution**

The execution model of behave-graph mimicks Unreal Engine Blueprints and Unity Visual Scripting.

We categorize nodes into two separate groups, flow nodes, those which drive the execution, and immediate nodes, those who values are pulled in by the flow nodes.  These nodes have different execution models.

Flow Execution

For the flow nodes, execution starts with the triggering of an event.  The event then has one or more flow outputs (outputs that are denoted by an arrow usually rather than a value.)  The event will trigger one of these flow outputs and if another node is connected to that flow output, it now begins execution.  That next node could be an action, something that effects something in the scene or broader context, or it could be a flow control node, like a branch or for-loop.

Immediate Execution

When each flow node executions, it may have non-flow input sockets.  These non-flow input sockets are like function parameters.  They will affect how that nodes executes.  The execution model for non-flow inputs is immediate.  When the values of these input sockets are requested, the ancestor nodes that produces these values are evaluated immediately.  This can be done in a depth first traversal method, which eventually resolves the values.

According for Complexities in Flow Execution

Initially, flow execution in behave-graph was implemented as a queue.  Each time a node was triggered for execution via a flow connection, it would be added to a queue.  And then nodes would be removed from the front of the queue and evaluated.  This worked for very simple graphs, but it didn't handle two complexities that arise in Unreal Engine Blueprints and Unity Visual Script.

Async Flow Nodes

Async flow nodes are nodes such as "Delay."  When it is executed, it does not trigger its output flow socket until a specified amount of time later.  While we could have just paused the full behave-graph execution engine during this time period, this isn't efficient.  Instead we designed native support within behave-graph for async flow execution.

The means by which we did this, was that we allow for nodes, when they are executed, to specify that they are async and that they are pending.  When this is the case, we wait for that node to complete its execution, but we do not block on it.  We also now divide up execution into different sync regions, within which there are no async node executions.  Each time an async node triggers its output in an async manner, it causes a new sync region to be created with that triggered node as the originator.  You can think of async nodes as act as sync region barriers.

Here is the implementation for Delay that shows how this is done:

```typescript
export class Delay extends Node {
  constructor() {
    super(
      'Time',
      'time/delay',
      [new Socket('flow', 'flow'), new Socket('float', 'duration')],
      [new Socket('flow', 'flow')],
      (context: NodeEvalContext) => {
        let timeIsCancelled = false; // work around clearTimeout is not available on node.

        setTimeout(() => {
          if (timeIsCancelled) {
            return;
          }
          context.commit('flow');
          context.finish();
        }, context.readInput<number>('duration') * 1000);

        context.onAsyncCancelled.addListener(() => {
          timeIsCancelled = true;
        });
      }
    );

    this.async = true;
  }
}
```

Sequential Output Flow Nodes

A number of useful flow control nodes will have multiple flow outputs triggered in a sequence.  The simplest such node is "Sequence", but another common one is "For Loop."

Let's look in depth at "For Loop" node and how it behaves.  When it executes, it will fire its "loopBody" flow output multiple times in a sequence and then once that is done, it will fire the "completed" flow output.  The way that it triggers the "loopBody" flow output is very interesting though, it doesn't just first it a bunch of times in a row immediately, rather in Unreal Engine and Unity, it only fires the "loopBody" flow output after the previous downstream "loopBody" execution finishes.  This is required because "For Loop"s can be "broken" out of.  In order to do that "break" of a for loop, you can not fire off all of the "loopBody"s ahead of time.

Behave-graph handles this situation by allowing for any flow node that is triggering a flow output, to provide a callback that will be called once the descendent execution graph for that flow output is complex within the current sync context.

Here is how those callsbacks are used by the current implementation of for loop within behave-graph:

```typescript
export class ForLoop extends Node {
  constructor() {
    super(
      'Flow',
      'flow/forLoop',
      [
        new Socket('flow', 'flow'),
        new Socket('integer', 'startIndex'),
        new Socket('integer', 'endIndex')
      ],
      [
        new Socket('flow', 'loopBody'),
        new Socket('integer', 'index'),
        new Socket('flow', 'completed')
      ],
      (context: NodeEvalContext) => {
        // these outputs are fired sequentially in an async fashion but without delays.
        // Thus a promise is returned and it continually returns a promise until each of the sequences has been executed.
        const startIndex = context.readInput<bigint>('startIndex');
        const endIndex = context.readInput<bigint>('endIndex');
        const loopBodyIteration = function loopBodyIteration(i: bigint) {
          if (i < endIndex) {
            context.writeOutput('index', i);
            context.commit('loopBody', () => {
              loopBodyIteration(i + 1n);
            });
          } else {
            context.commit('completed');
          }
        };
        loopBodyIteration(startIndex);
      }
    );
  }
}
```
