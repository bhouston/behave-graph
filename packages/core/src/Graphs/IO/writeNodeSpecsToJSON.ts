import { NodeCategory } from '../../Nodes/NodeDefinitions.js';
import { Dependencies } from '../../Nodes/Registry/DependenciesRegistry.js';
import { NodeDefinitionsMap } from '../../Nodes/Registry/NodeDefinitionsMap.js';
import { Choices } from '../../Sockets/Socket.js';
import { ValueTypeMap } from '../../Values/ValueTypeMap.js';
import { createNode, IGraphApi } from '../Graph.js';
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

export function writeNodeSpecsToJSON({
  values,
  nodes,
  dependencies
}: {
  values: ValueTypeMap;
  nodes: NodeDefinitionsMap;
  dependencies: Dependencies;
}): NodeSpecJSON[] {
  const nodeSpecsJSON: NodeSpecJSON[] = [];

  // const graph = new Graph(registry);

  const graph: IGraphApi = {
    values: values,
    customEvents: {},
    getDependency: (id: string) => dependencies[id],
    variables: {}
  };

  Object.keys(nodes).forEach((nodeTypeName) => {
    const node = createNode({
      graph,
      nodes,
      values,
      nodeTypeName
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
          : values[inputSocket.valueTypeName];

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

    nodeSpecsJSON.push(nodeSpecJSON);
  });

  return nodeSpecsJSON;
}
