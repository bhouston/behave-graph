import { Registry } from '../../Registry';

const nodeTypeNameRegex = /^\w+(\/\w+)*$/;
const socketNameRegex = /^\w+$/;

export function validateNodeRegistry(graphRegistry: Registry): string[] {
  const errorList: string[] = [];
  graphRegistry.nodes.getAllNames().forEach((nodeTypeName) => {
    const node = graphRegistry.nodes.create(nodeTypeName);

    // ensure node is registered correctly.
    if (node.typeName !== nodeTypeName) {
      errorList.push(
        `node with typeName '${node.typeName}' is registered under a different name '${nodeTypeName}'`
      );
    }

    if (!nodeTypeNameRegex.test(node.typeName)) {
      errorList.push(`invalid node type name on node ${node.typeName}`);
    }

    node.inputSockets.forEach((socket) => {
      if (!socketNameRegex.test(socket.name)) {
        errorList.push(
          `invalid socket name for input socket ${socket.name} on node ${node.typeName}`
        );
      }

      if (socket.valueTypeName === 'flow') {
        return;
      }
      const valueType = graphRegistry.values.get(socket.valueTypeName);
      // check to ensure all value types are supported.
      if (valueType === undefined) {
        errorList.push(
          `node '${node.typeName}' has on input socket '${socket.name}' an unregistered value type '${socket.valueTypeName}'`
        );
      }
    });

    node.outputSockets.forEach((socket) => {
      if (!socketNameRegex.test(socket.name)) {
        errorList.push(
          `invalid socket name for output socket ${socket.name} on node ${node.typeName}`
        );
      }
      if (socket.valueTypeName === 'flow') {
        return;
      }
      const valueType = graphRegistry.values.get(socket.valueTypeName);
      // check to ensure all value types are supported.
      if (valueType === undefined) {
        errorList.push(
          `node '${node.typeName}' has on output socket '${socket.name}' an unregistered value type '${socket.valueTypeName}'`
        );
      }
    });
  });
  return errorList;
}
