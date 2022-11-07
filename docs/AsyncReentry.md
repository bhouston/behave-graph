Node Lifecycles

There are different types of nodes and they have different lifecycles.

Immediate Nodes

They are executed in a synchronous fashion and must return a result immediately to their outputs.

Flow Nodes

Flow nodes are synchronous as well and thus must return their results immediately via a commit.  The main difference with immediate nodes is that flow nodes have a trigger flow input and they may have internal state.  A flow node may wait for downstream nodes to complete execution and then fire a new flow output, such as a For-Loop node.

Async Flow Nodes

Asynchronous flow nodes have one or more flow inputs.  They will run for an arbitrarily long time until they are "finished" or they are "cancelled."  An asynchronous node will begin its execution upon a trigger if it is not already running.  If it is already running, a subsequent trigger may modify its existing executing, but it will not start a secondary parallel execution.

An example of an async flow node is the delay node.  The delay node, once triggered will fire its output flow socket after a delay period specified by its duration parameter.  If the delay node is triggered multiple times during its delay period, it will be aware that it was triggered, but the standard implementation is to ignore all subsequent triggers until the first duration period has expired and the output flow socket was triggered, then it will reset and wait for additional triggers.

Event Flow Nodes

Event flow nodes do not have a trigger input, but they do have flow outputs.  Event nodes are all initialized upon the start of the graph execution and are disposed upon the end of the graph's lifecycle.  Event nodes will fire events periodically creating new fibers for the graph execution engine to execute.