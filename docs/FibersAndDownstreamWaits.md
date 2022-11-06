An Async node will commit its results to the same fiber, just at the end of the work queue.
A for loop will commit loop body at the start of the queue?
Waiting for completion is just the insertion of a marker into the execution queue?  Actually it could be viewed as inserting yourself into the execution queue, so that as you pop things off the top, eventually it gets back to you.

Thus nodes that want to wait for downstream completely, stay on the stack.  Where as those that do not care, do not stay on the stack.


I am now trying to make the multiple fibers onto a single queue where some types of nodes push other nodes onto the top, while other ones push it onto the bottom.
Async nodes, events push onto the bottom.  They are new execution contexts.
Flow nodes push onto the top.

This means that I am unsure how to ever trigger a for-loop node to cancel it, because its loop body will be always prioritized against any other event coming in.  Instead you need to have a for loop cancel node that is downstream.


