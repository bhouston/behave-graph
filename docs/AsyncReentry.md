Async Reentry

WARNING: THese are notes, not a description of its currently implementation.

Some nodes, like a cancellable debounce node, require that a flow entry to a node can affect a currently executing async node.  This means that the execution context needs to not be generated on each execution, but rather shared.

This can be done in a number of fashions.  Either we can make all nodes share their execution context all the time and it is on the node itself to detangle multiple executions from each other.  Or alternatively, we could make certain input flow sockets are context creators and others are reentrant?

A good thought experiment is the delay node.  It is not reentrant.  Thus it was implemented such that any flow socket triggered execution would cause a new context to be created and it would be async.  This implementation allowed one to trigger the delay node multiple times and it would then delay multiple times, even in parallel and execute its output flow socket correctly.  Basically each new triggered input caused a new output to be triggered in a separate context.

The debounce node, because it is cancellable, can not have a new context created on each flow input.  Because one of the flow inputs is cancel, if it was to create a new context, then you would not be able to cancel the existing delayed debounced trigger.  Instead it has to break into the currently delaying debounce.

If we allowed some flow sockets to create new contexts on the debounce node, it would still be problematic because if you did multiple triggers, it would create a number of contexts and they would all be in flight and if a cancel flow was triggered, which context would it affect?

This suggests that for the delay it would not be reentrant, where as the debounce would be reentrant.  Reentrant async nodes would only have a single context.

This suggests that:
- immediate OR flow
if( flow ) {
 if( async ) {
  if( interruptable ) {
    // probably an event
  }
  if( reentrant ) {
   // only a single shared context, for-loop, debounce
  }
  else {
  }
}
else {
    immediate
}

After further research it appears that a Delay node in Unreal Engine Blueprints can only handle a single execution at a time.  Thus it is sort of reentrant in that the second time it fires, if it is already running, it will ignore that trigger.

https://forums.unrealengine.com/t/delay-cant-execute-many-delay-at-same-time/51058
