## Async Behavior

There are a number of scenarios where we need nodes to exhibit non-immediate behavior:
* Delay node.  This node needs to be evaluated and then it waits until it fires it's output.  This can be represented by a promite which passes along the output values.  It turns out the delay node can only be called a single time.  If you call it again while it is being delayed, it will not fire.
* Sequence node.  This node needs to fire a number of outputs in order.  Q: Does it wait for the execution of each flow output to complete before firing the next?
* For-Loop node.  This node needs to fire off the same flow output, "loop-body", a set number of times.  Q: How does it wait until the "loop-body" sub graph is completed?  Is there a specific way that it knows the loop-body is done?
* For-Loop-With-Break node.  This node has a secondary input that is "Break".  It can be called by the body of the loop but not directly, only by having a custom event prior to the for-loop that is called by the loop-body.


Notes/Issues:
* Both Sequence and For-Loop and While-Loop appear to have the upstream nodes aware of when a sub-graph is completed executing.
* It appears you can not have loops in a Blueprint.  It must be a DAG.  That is nice.
* It appears that you can not call the same node twice while it is executing?

Solution:
* Could I implement Sequence, For-Loop and While-Loop as nodes which are aware of their sub-graph executions?  Basically there could be a promise given on these flow outputs, which when that sub-graph is completed, that promise is executed.
** How would that be implemented?  I feel it is like a stack - but this is global.

** It may be the same mechanism that prevents another event from firing until the graph is done?

** What happens to a for-loop body in the presence of a delay loop?  Does that prevent the loop from finishing?  Does it prevent new events from firing?

Understanding Concurrency and Parallelism Presentation with an email of a guy at Unreal Engine:
https://nanopdf.com/download/gerke-max-preussner-4_pdf
* All blueprints are run in the "game thread."



* Unity Visual Scripting does "Loop Breaks" via a node that breaks the current loop rather than requiring one to trigger an event that stops the loop.  I like this better.

* Unity Visual Scripting even has exception handling.  Try/Catch nodes and Throw Nodes.
* Unity Visual Scriptings has "cache"/"memo" nodes that cache expensive operations and only recalculate them if their inputs change.

* Unity Visual Scripting has more complex time nodes.
** Wait Until.  Keeps checking an input boolean over and over again until it is true, and then it continues operation.

## Proposed Impolementation of Waitable Nodes - For-Loop, Sequence, Etc - Nodes that Wait for their Downstream Evaluation to Complete

* If you want to track if a downstream section executed, you should pass a onFulfilled function as the value for that eval output socket.  Once that downstream sub-graph completes, it will fire.
Something akin to: public type onFulfilled: () => void;

This is useful for anytime you want to wait for the sub-graph to evaluate.

The way that this is implemented internally is that this onFulfilled is automatically passed down nodes who are promise free and is auto-called when there are no more eval nodes to pass it to.

If it encounters a promise-oriented node, you have two choices, you can either immediate resolve the onFulfilled (which is what I believe Delay node does in UE4, but what does it do in Unity)?  Or you can wait on that promise node until it is full resolved.
## Multi Output Nodes - For-Loop, Sequence, (Events?) - Which will fire multiple sets of outputs.

These nodes execute the first time based on an incoming Flow input socket.  But then they can fire multiple sets of outputs.

(Should I have a way of specifying as a function call, which output should be next?

```
context.commit( downstreamFlowSocketName: string, onDownstreamCompleted: ()=> void );
```

Should the above commit be required if there are multiple output FlowSockets?  Sure, that can work.



