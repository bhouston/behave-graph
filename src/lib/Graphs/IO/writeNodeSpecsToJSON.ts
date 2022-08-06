import GraphRegistry from '../GraphRegistry';
import { InputSocketSpec, NodeSpec, OutputSocketSpec } from './NodeSpecJSON';

export default function writeNodeSpecsToJSON(registry: GraphRegistry): NodeSpec[] {
  const nodeSpecsJSON: NodeSpec[] = [];

  registry.nodes.nodeTypeNameToNodeFactory.forEach((nodeFactory, nodeType) => {
    const node = nodeFactory();

    const nodeSpecJSON: NodeSpec = {
      type: nodeType,
      category: node.category,
      inputs: [],
      outputs: [],
    };

    node.inputSockets.forEach((inputSocket) => {
      const socketSpecJSON: InputSocketSpec = {
        name: inputSocket.name,
        defaultValue: inputSocket.value,
        valueType: inputSocket.valueTypeName,
      };
      nodeSpecJSON.inputs.push(socketSpecJSON);
    });

    node.outputSockets.forEach((outputSocket) => {
      const socketSpecJSON: OutputSocketSpec = {
        name: outputSocket.name,
        valueType: outputSocket.valueTypeName,
      };
      nodeSpecJSON.outputs.push(socketSpecJSON);
    });

    nodeSpecsJSON.push(nodeSpecJSON);
  });

  return nodeSpecsJSON;
}
