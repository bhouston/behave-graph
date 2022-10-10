import { Graph } from '../Graph.js';
import {
  CustomEventJSON,
  GraphJSON,
  InputJSON,
  LinkJSON,
  NodeJSON,
  VariableJSON
} from './GraphJSON.js';

export function writeGraphToJSON(graph: Graph): GraphJSON {
  const graphJson: GraphJSON = {
    nodes: [],
    variables: [],
    customEvents: []
  };

  if (graph.name.length > 0) {
    graphJson.name = graph.name;
  }
  if (Object.keys(graph.metadata).length > 0) {
    graphJson.metadata = graph.metadata;
  }

  // save custom events
  Object.values(graph.customEvents).forEach((customEvent) => {
    const customEventJson: CustomEventJSON = {
      name: customEvent.name,
      id: customEvent.id
    };
    if (customEvent.label.length > 0) {
      customEventJson.label = customEvent.label;
    }
    if (Object.keys(customEvent.metadata).length > 0) {
      customEventJson.metadata = customEvent.metadata;
    }
    graphJson.customEvents.push(customEventJson);
  });

  // save variables
  Object.values(graph.variables).forEach((variable) => {
    const variableJson: VariableJSON = {
      valueTypeName: variable.valueTypeName,
      name: variable.name,
      id: variable.id,
      initialValue: graph.registry.values
        .get(variable.valueTypeName)
        .serialize(variable.initialValue)
    };
    if (variable.label.length > 0) {
      variableJson.label = variable.label;
    }
    if (Object.keys(variable.metadata).length > 0) {
      variableJson.metadata = variable.metadata;
    }
    graphJson.variables.push(variableJson);
  });

  // save nodes
  Object.values(graph.nodes).forEach((node) => {
    const nodeJson: NodeJSON = {
      type: node.typeName,
      id: node.id
    };
    if (node.label.length > 0) {
      nodeJson.label = node.label;
    }
    if (Object.keys(node.metadata).length > 0) {
      nodeJson.metadata = node.metadata;
    }

    const parametersJson: NodeJSON['inputs'] = {};
    node.inputSockets.forEach((inputSocket) => {
      if (inputSocket.valueTypeName === 'flow') return;

      const parameterJson: InputJSON = {};

      if (inputSocket.links.length === 0) {
        parameterJson.value = graph.registry.values
          .get(inputSocket.valueTypeName)
          .serialize(inputSocket.value);
      } else if (inputSocket.links.length === 1) {
        const link = inputSocket.links[0];
        parameterJson.link = {
          nodeId: link.nodeId,
          socket: link.socketName
        };
      } else {
        throw new Error(
          `should not get here, inputSocket.links.length = ${inputSocket.links.length} > 1`
        );
      }
      parametersJson[inputSocket.name] = parameterJson;
    });

    if (Object.keys(parametersJson).length > 0) {
      nodeJson.parameters = parametersJson;
    }

    const flowsJson: { [output: string]: LinkJSON } = {};
    node.outputSockets.forEach((outputSocket) => {
      if (outputSocket.valueTypeName !== 'flow') return;

      if (outputSocket.links.length === 0) return;

      const linkJson = {
        nodeId: outputSocket.links[0].nodeId,
        socket: outputSocket.links[0].socketName
      };

      flowsJson[outputSocket.name] = linkJson;
    });

    if (Object.keys(flowsJson).length > 0) {
      nodeJson.flows = flowsJson;
    }

    graphJson.nodes.push(nodeJson);
  });

  return graphJson;
}
