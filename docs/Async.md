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

