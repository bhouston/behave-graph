---
sidebar_position: 2
---

# Defining a Graph

A graph is a collection of nodes that define the flow of your application. The graph is defined in JSON format and can be created using the [Graph Editor](./graph-editor) or by writing it manually.

Here's an example of how a Graph should look like:

```json
{
  "nodes": [
    {
      "type": "lifecycle/onStart",
      "id": "0",
      "flows": {
        "flow": {
          "nodeId": "1",
          "socket": "flow"
        }
      }
    },
    {
      "type": "debug/log",
      "id": "1",
      "parameters": {
        "text": {
          "value": "Hello World!"
        }
      }
    }
  ]
}
```

Each node has a `type` and an `id`. The `type` is the name of the node and the `id` is a unique identifier for the node.

The nodes are connected using `flows`. Each node has a `flows` property that is an object with the name of the flow as the key and the value is an object with the `nodeId` and the `socket` of the node that the flow is connected to.

The nodes can also accept an arbitrary number of parameters. Each parameter can have a `value` or a `link` to another node's output.

The syntax to define a link is:

```json
"parameters": {
  "text": {
    "link": {
      "nodeId": "1",
      "socket": "result"
    }
  }
}
```