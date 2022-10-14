**Declaring Nodes**

Nodes within behave-graph are composed of input sockets, output sockets and an evaluation function.  Flow nodes will have flow sockets on them, while immediate nodes will not have any flow sockets on them.

The Node class, which is the basis of all nodes, is designed so that you do not need to subclass it in order to specify a custom node type, rather you can just provide a bunch of constructor parameters to it.  Often those in behave-graph subclasses of Nodes are used for convenient sake or to improve code organization.

NodeEvalContext is a class that an executing node can use to access inputs, set outputs as well as interact with the context of the execution.  It is passed as input to the evaluation function.

A simple node that logs a string to the console can be declared like this:

```typescript
export class Log extends Node {
  constructor() {
    super(
      'Action',
      'action/log',
      [new Socket('flow', 'flow'), new Socket('string', 'text')],
      [new Socket('flow', 'flow')],
      (context: NodeEvalContext) => {
        console.log(context.readInput('text'));
      }
    );
  }
}
```


