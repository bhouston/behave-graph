import { NodeCategory } from '../../Nodes/NodeDefinitions.js';
import { IRegistry } from '../../Registry.js';
import { Choices } from '../../Sockets/Socket.js';
import { createNode, makeGraphApi } from '../Graph.js';
import { NodeConfigurationJSON } from './GraphJSON.js';
import {
  ChoiceJSON,
  InputSocketSpecJSON,
  NodeSpecJSON,
  OutputSocketSpecJSON
} from './NodeSpecJSON.js';

function toChoices(valueChoices: Choices | undefined): ChoiceJSON | undefined {
  return valueChoices?.map((choice) => {
    if (typeof choice === 'string') return { text: choice, value: choice };
    return choice;
  });
}

// create JSON specs for a single node based on given configuration
export function writeNodeSpecToJSON(registry: IRegistry, nodeTypeName: string, configuration: NodeConfigurationJSON): NodeSpecJSON {
  const graph = makeGraphApi({
    ...registry,
    customEvents: {},
    variables: {}
  });

  const node = createNode({
    graph,
    registry,
    nodeTypeName,
    nodeConfiguration: configuration,
  });

  const nodeSpecJSON: NodeSpecJSON = {
    type: nodeTypeName,
    category: node.description.category as NodeCategory,
    label: node.description.label,
    inputs: [],
    outputs: [],
    configuration: []
  };

  node.inputs.forEach((inputSocket) => {
    const valueType =
      inputSocket.valueTypeName === 'flow'
        ? undefined
        : registry.values[inputSocket.valueTypeName];

    let defaultValue = inputSocket.value;
    if (valueType !== undefined) {
      defaultValue = valueType.serialize(defaultValue);
    }
    if (defaultValue === undefined && valueType !== undefined) {
      defaultValue = valueType.serialize(valueType.creator());
    }
    const socketSpecJSON: InputSocketSpecJSON = {
      name: inputSocket.name,
      valueType: inputSocket.valueTypeName,
      defaultValue,
      choices: toChoices(inputSocket.valueChoices)
    };
    nodeSpecJSON.inputs.push(socketSpecJSON);
  });

  node.outputs.forEach((outputSocket) => {
    const socketSpecJSON: OutputSocketSpecJSON = {
      name: outputSocket.name,
      valueType: outputSocket.valueTypeName
    };
    nodeSpecJSON.outputs.push(socketSpecJSON);
  });

  Object.entries(node.description.configuration).forEach(([ configName, configSpec ]) => {
    nodeSpecJSON.configuration.push({
      name: configName,
      valueType: configSpec.valueType,
      defaultValue: configSpec.defaultValue
    });
  });

  return nodeSpecJSON;
}

// create JSON specs for all nodes with empty configuration
export function writeDefaultNodeSpecsToJSON(registry: IRegistry): NodeSpecJSON[] {
  const nodeSpecsJSON: NodeSpecJSON[] = [];

  Object.keys(registry.nodes).forEach((nodeTypeName) => {
    nodeSpecsJSON.push(writeNodeSpecToJSON(registry, nodeTypeName, {}));
  });

  return nodeSpecsJSON;
}
