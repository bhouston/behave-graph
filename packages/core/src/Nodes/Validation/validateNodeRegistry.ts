import { Graph } from '../../Graphs/Graph';
import { Registry } from '../../Registry';

// eslint-disable-next-line unicorn/no-unsafe-regex
const nodeTypeNameRegex = /^\w+(\/\w+)*$/;
const socketNameRegex = /^\w+$/;

export function validateNodeRegistry(registry: Registry): string[] {
  const errorList: string[] = [];
  const graph = new Graph(registry);
  registry.nodes.getAllNames().forEach((nodeTypeName) => {
    const node = graph.createNode(nodeTypeName);

    const { typeName, otherTypeNames, inputs, outputs } = node;

    // ensure node is registered correctly.
    if (typeName !== nodeTypeName) {
      if (!otherTypeNames?.includes(nodeTypeName)) {
        errorList.push(
          `node with typeName '${typeName}' is registered under a different name '${nodeTypeName}'`
        );
      }
    }

    if (!nodeTypeNameRegex.test(typeName)) {
      errorList.push(`invalid node type name on node ${typeName}`);
    }

    inputs.forEach((socket) => {
      if (!socketNameRegex.test(socket.name)) {
        errorList.push(
          `invalid socket name for input socket ${socket.name} on node ${typeName}`
        );
      }

      if (socket.valueTypeName === 'flow') {
        return;
      }
      const valueType = registry.values.get(socket.valueTypeName);
      // check to ensure all value types are supported.
      if (valueType === undefined) {
        errorList.push(
          `node '${typeName}' has on input socket '${socket.name}' an unregistered value type '${socket.valueTypeName}'`
        );
      }
    });

    outputs.forEach((socket) => {
      if (!socketNameRegex.test(socket.name)) {
        errorList.push(
          `invalid socket name for output socket ${socket.name} on node ${typeName}`
        );
      }
      if (socket.valueTypeName === 'flow') {
        return;
      }
      const valueType = registry.values.get(socket.valueTypeName);
      // check to ensure all value types are supported.
      if (valueType === undefined) {
        errorList.push(
          `node '${typeName}' has on output socket '${socket.name}' an unregistered value type '${socket.valueTypeName}'`
        );
      }
    });
  });
  return errorList;
}
