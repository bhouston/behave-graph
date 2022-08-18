import GraphRegistry from '../GraphRegistry';

export default function validateGraphRegistry(graphRegistry: GraphRegistry): string[] {
  const errorList: string[] = [];
  graphRegistry.nodes.nodeTypeNameToNodeFactory.forEach((nodeFactory, nodeTypeName) => {
    const node = nodeFactory();

    // ensure node is registered correctly.
    if (node.typeName !== nodeTypeName) {
      errorList.push(`node with typeName '${node.typeName}' is registered under a different name '${nodeTypeName}'`);
    }

    node.inputSockets.forEach((socket) => {
      if (socket.valueTypeName === 'flow') return;
      const valueType = graphRegistry.values.valueTypeNameToValueType.get(socket.valueTypeName);
      // check to ensure all value types are supported.
      if (valueType === undefined) {
        errorList.push(`node '${node.typeName}' has on input socket '${socket.name}' an unregistered value type '${socket.valueTypeName}'`);
      }
    });

    node.outputSockets.forEach((socket) => {
      if (socket.valueTypeName === 'flow') return;
      const valueType = graphRegistry.values.valueTypeNameToValueType.get(socket.valueTypeName);
      // check to ensure all value types are supported.
      if (valueType === undefined) {
        errorList.push(`node '${node.typeName}' has on output socket '${socket.name}' an unregistered value type '${socket.valueTypeName}'`);
      }
    });
  });
  return errorList;
}
