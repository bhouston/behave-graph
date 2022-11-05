import { Graph } from '../../Graphs/Graph.js';
import { Registry } from '../../Registry.js';

const nodeTypeNameRegex = /^\w+(\/\w+)*$/;
const socketNameRegex = /^\w+$/;

export function validateNodeRegistry(registry: Registry): string[] {
  const errorList: string[] = [];
  const graph = new Graph(registry);
  registry.nodes.getAllNames().forEach((nodeTypeName) => {
    const node = graph.createNode(nodeTypeName);

    // ensure node is registered correctly.
    if (node.description.typeName !== nodeTypeName) {
      errorList.push(
        `node with typeName '${node.description.typeName}' is registered under a different name '${nodeTypeName}'`
      );
    }

    if (!nodeTypeNameRegex.test(node.description.typeName)) {
      errorList.push(
        `invalid node type name on node ${node.description.typeName}`
      );
    }

    node.inputSockets.forEach((socket) => {
      if (!socketNameRegex.test(socket.name)) {
        errorList.push(
          `invalid socket name for input socket ${socket.name} on node ${node.description.typeName}`
        );
      }

      if (socket.valueTypeName === 'flow') {
        return;
      }
      const valueType = registry.values.get(socket.valueTypeName);
      // check to ensure all value types are supported.
      if (valueType === undefined) {
        errorList.push(
          `node '${node.description.typeName}' has on input socket '${socket.name}' an unregistered value type '${socket.valueTypeName}'`
        );
      }
    });

    node.outputSockets.forEach((socket) => {
      if (!socketNameRegex.test(socket.name)) {
        errorList.push(
          `invalid socket name for output socket ${socket.name} on node ${node.description.typeName}`
        );
      }
      if (socket.valueTypeName === 'flow') {
        return;
      }
      const valueType = registry.values.get(socket.valueTypeName);
      // check to ensure all value types are supported.
      if (valueType === undefined) {
        errorList.push(
          `node '${node.description.typeName}' has on output socket '${socket.name}' an unregistered value type '${socket.valueTypeName}'`
        );
      }
    });
  });
  return errorList;
}
