import { Registry } from '../../Registry';
import {
  InputSocketSpecJSON,
  NodeSpecJSON,
  OutputSocketSpecJSON
} from './NodeSpecJSON';

export function writeNodeSpecsToJSON(registry: Registry): NodeSpecJSON[] {
  const nodeSpecsJSON: NodeSpecJSON[] = [];

  registry.nodes.getAllNames().forEach((nodeTypeName) => {
    const node = registry.nodes.create(nodeTypeName);

    const nodeSpecJSON: NodeSpecJSON = {
      type: nodeTypeName,
      category: node.category,
      inputs: [],
      outputs: []
    };

    node.inputSockets.forEach((inputSocket) => {
      const socketSpecJSON: InputSocketSpecJSON = {
        name: inputSocket.name,
        defaultValue: inputSocket.value,
        valueType: inputSocket.valueTypeName
      };
      nodeSpecJSON.inputs.push(socketSpecJSON);
    });

    node.outputSockets.forEach((outputSocket) => {
      const socketSpecJSON: OutputSocketSpecJSON = {
        name: outputSocket.name,
        valueType: outputSocket.valueTypeName
      };
      nodeSpecJSON.outputs.push(socketSpecJSON);
    });

    nodeSpecsJSON.push(nodeSpecJSON);
  });

  return nodeSpecsJSON;
}
