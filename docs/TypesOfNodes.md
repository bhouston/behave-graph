**Graph Execution**

The types of nodes in behave-graph mimic those found in Unreal Engine Blueprints and Unity Visual Scripting.

The different node types have different execution models and are also declared differently.  The main two categories of nodes are "flow" nodes, that are nodes who are activate participants in the control flow of the behavior graph, and immediate nodes, who are evaluated on demand when their results are required by "flow" nodes.

Immediate Nodes

Immediate nodes are the simplest type of node.  They do not support "flow" input or output sockets, rather they only have non-flow sockets.  These nodes are evaluated on demand an output of theirs are required.  Thes are most often used for mathematical operators, or for queries of context or state.

If there is a network of immediate nodes, execution proceed by first evaluating the most leaf nodes and then proceeding downwards through the graph until you have evaluated the output sockets of the immediate nodes you require.

Basic Flow Nodes

There are a couple types of flow nodes, but the main flow node will take a flow input and also have one or more flow outputs.  When it's flow input is triggered, it will evaluate and then synchrously trigger one of its flow outputs, continuing execution of the graph.  Most action nodes are basic flow nodes, such as if you want to log a message, or modify a scene graph property.  Basic flow nodes can also wait for the downstream execution triggered by its flow output to complete and then do another operation, which is usually to trigger another downstream output flow.  Some control flow nodes are basic flow nodes, such as a branch/condition node as well as both the for-loop and sequence nodes (the later two use the basic flow node's ability to wait for the completion of the downstream node graph execution.)

Event Nodes

Event nodes are nodes that cause execution in the graph to start.  They do not have any input "flow" sockets, but they are allow to have non-flow input sockets that may set the parameters for the event node's operation.

Event nodes are all initialized at the start of graph execution.  It is expected that after this initialization, the event nodes will trigger their "flow" output sockets when there is an event, and this will happen at any time.  These events nodes will not be revisited by the graph execution engine, rather they are assumed to just be active behind the scenes.

Async Nodes

Async nodes are nodes whom when are triggered will remain activate.  They are not synchrous.  The simplest example is the delay node.  When this node is triggered, it is not required to immediately trigger an output "flow" socket, but rather it can return the trigger function without calling an output.  And then later, when it so wants to trigger an output "flow" socket, it can.  This can implement a delay node, where you set a timer when the input "flow" socket is triggered and when that timer callback occurs, you can trigger the output "flow" socket. 