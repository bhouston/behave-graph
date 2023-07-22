import { Logger } from '../../Diagnostics/Logger.js';
import { CustomEvent } from '../../Events/CustomEvent.js';
import { Link } from '../../Nodes/Link.js';
import { NodeConfiguration } from '../../Nodes/Node.js';
import { INode } from '../../Nodes/NodeInstance.js';
import { NodeDefinitionsMap } from '../../Nodes/Registry/NodeDefinitionsMap.js';
import { IRegistry } from '../../Registry.js';
import { Socket } from '../../Sockets/Socket.js';
import { ValueTypeMap } from '../../Values/ValueTypeMap.js';
import { Variable } from '../../Values/Variables/Variable.js';
import {
  createNode,
  GraphCustomEvents,
  GraphInstance,
  GraphNodes,
  GraphVariables,
  IGraphApi,
  makeGraphApi
} from '../Graph.js';
import {
  CustomEventJSON,
  FlowsJSON,
  GraphJSON,
  NodeJSON,
  NodeParametersJSON,
  VariableJSON
} from './GraphJSON.js';

// Purpose:
//  - loads a node graph
export function readGraphFromJSON({
  graphJson,
  registry
}: {
  graphJson: GraphJSON;
  registry: IRegistry;
}): GraphInstance {
  const graphName = graphJson?.name || '';
  const graphMetadata = graphJson?.metadata || {};

  let variables: GraphVariables = {};
  let customEvents: GraphCustomEvents = {};

  if ('variables' in graphJson) {
    variables = readVariablesJSON(registry.values, graphJson.variables ?? []);
  }
  if ('customEvents' in graphJson) {
    customEvents = readCustomEventsJSON(
      registry.values,
      graphJson.customEvents ?? []
    );
  }

  const nodesJson = graphJson?.nodes ?? [];

  if (nodesJson.length === 0) {
    Logger.warn('readGraphFromJSON: no nodes specified');
  }

  const graphApi = makeGraphApi({
    ...registry,
    variables,
    customEvents
  });

  const nodes: GraphNodes = {};
  // create new BehaviorNode instances for each node in the json.
  for (let i = 0; i < nodesJson.length; i += 1) {
    const nodeJson = nodesJson[i];
    const node = readNodeJSON({
      graph: graphApi,
      nodes: registry.nodes,
      values: registry.values,
      nodeJson
    });
    const id = nodeJson.id;

    if (id in nodes) {
      throw new Error(
        `can not create new node with id ${id} as one with that id already exists.`
      );
    }

    nodes[id] = node;
  }

  // connect up the graph edges from BehaviorNode inputs to outputs.  This is required to follow execution
  Object.entries(nodes).forEach(([nodeId, node]) => {
    // initialize the inputs by resolving to the reference nodes.
    node.inputs.forEach((inputSocket) => {
      inputSocket.links.forEach((link) => {
        if (!(link.nodeId in nodes)) {
          throw new Error(
            `node '${node.description.typeName}' specifies an input '${inputSocket.name}' whose link goes to ` +
              `a nonexistent upstream node id: ${link.nodeId}`
          );
        }
        const upstreamNode = nodes[link.nodeId];
        const upstreamOutputSocket = upstreamNode.outputs.find(
          (socket) => socket.name === link.socketName
        );
        if (upstreamOutputSocket === undefined) {
          throw new Error(
            `node '${node.description.typeName}' specifies an input '${inputSocket.name}' whose link goes to ` +
              `a nonexistent output '${link.socketName}' on upstream node '${upstreamNode.description.typeName}'`
          );
        }

        // add, only if unique
        const upstreamLink = new Link(nodeId, inputSocket.name);
        if (
          upstreamOutputSocket.links.findIndex(
            (value) =>
              value.nodeId == upstreamLink.nodeId &&
              value.socketName == upstreamLink.socketName
          ) < 0
        ) {
          upstreamOutputSocket.links.push(upstreamLink);
        }
      });
    });

    node.outputs.forEach((outputSocket) => {
      outputSocket.links.forEach((link) => {
        if (!(link.nodeId in nodes)) {
          throw new Error(
            `node '${node.description.typeName}' specifies an output '${outputSocket.name}' whose link goes to ` +
              `a nonexistent downstream node id ${link.nodeId}`
          );
        }

        const downstreamNode = nodes[link.nodeId];
        const downstreamInputSocket = downstreamNode.inputs.find(
          (socket) => socket.name === link.socketName
        );
        if (downstreamInputSocket === undefined) {
          throw new Error(
            `node '${node.description.typeName}' specifies an output '${outputSocket.name}' whose link goes to ` +
              `a nonexistent input '${link.socketName}' on downstream node '${downstreamNode.description.typeName}'`
          );
        }

        // add, only if unique
        const downstreamLink = new Link(nodeId, outputSocket.name);
        if (
          downstreamInputSocket.links.findIndex(
            (value) =>
              value.nodeId == downstreamLink.nodeId &&
              value.socketName == downstreamLink.socketName
          ) < 0
        ) {
          downstreamInputSocket.links.push(downstreamLink);
        }
      });
    });
  });

  return {
    name: graphName,
    metadata: graphMetadata,
    nodes: nodes,
    customEvents,
    variables
  };
}

function readNodeJSON({
  graph,
  nodes,
  values,
  nodeJson
}: {
  graph: IGraphApi;
  nodes: NodeDefinitionsMap;
  values: ValueTypeMap;
  nodeJson: NodeJSON;
}) {
  if (nodeJson.type === undefined) {
    throw new Error('readGraphFromJSON: no type for node');
  }
  const nodeName = nodeJson.type;
  const nodeConfigurationJson = nodeJson.configuration;
  const nodeConfiguration: NodeConfiguration = {};
  if (nodeConfigurationJson !== undefined) {
    Object.keys(nodeConfigurationJson).forEach((key) => {
      nodeConfiguration[key] = nodeConfigurationJson[key];
    });
  }

  const node = createNode({
    graph,
    nodes,
    values,
    nodeTypeName: nodeName,
    nodeConfiguration
  });

  node.label = nodeJson?.label ?? node.label;
  node.metadata = nodeJson?.metadata ?? node.metadata;

  if (nodeJson.parameters !== undefined) {
    readNodeParameterJSON(values, node, nodeJson.parameters);
  }
  if (nodeJson.flows !== undefined) {
    readNodeFlowsJSON(node, nodeJson.flows);
  }

  return node;
}

function readNodeParameterJSON(
  valuesRegistry: ValueTypeMap,
  node: INode,
  parametersJson: NodeParametersJSON
) {
  node.inputs.forEach((socket) => {
    if (!(socket.name in parametersJson)) {
      return;
    }

    const inputJson = parametersJson[socket.name];
    if ('value' in inputJson) {
      // eslint-disable-next-line no-param-reassign
      socket.value = valuesRegistry[socket.valueTypeName]?.deserialize(
        inputJson.value
      );
    }

    if ('link' in inputJson) {
      const linkJson = inputJson.link;
      socket.links.push(new Link(linkJson.nodeId, linkJson.socket));
    }
  });

  // validate that there are no additional input sockets specified that were not read.
  for (const inputName in parametersJson) {
    const inputSocket = node.inputs.find((socket) => socket.name === inputName);
    if (inputSocket === undefined) {
      throw new Error(
        `node '${
          node.description.typeName
        }' specifies an input '${inputName}' that doesn't exist on its node type, available inputs are: ${node.inputs
          .map((input) => input.name)
          .join(', ')}`
      );
    }
  }
}

function readNodeFlowsJSON(node: INode, flowsJson: FlowsJSON) {
  node.outputs.forEach((socket) => {
    if (socket.name in flowsJson) {
      const outputLinkJson = flowsJson[socket.name];
      socket.links.push(new Link(outputLinkJson.nodeId, outputLinkJson.socket));
    }
  });

  // validate that there are no additional input sockets specified that were not read.
  for (const outputName in flowsJson) {
    const outputSocket = node.outputs.find(
      (socket) => socket.name === outputName
    );
    if (outputSocket === undefined) {
      throw new Error(
        `node '${
          node.description.typeName
        }' specifies an output '${outputName}' that doesn't exist on its node type, available outputs are: ${node.outputs
          .map((output) => output.name)
          .join(', ')}`
      );
    }
  }
}

function readVariablesJSON(
  valuesRegistry: ValueTypeMap,
  variablesJson: VariableJSON[]
) {
  const variables: GraphVariables = {};
  for (let i = 0; i < variablesJson.length; i += 1) {
    const variableJson = variablesJson[i];

    const variable = new Variable(
      variableJson.id,
      variableJson.name,
      variableJson.valueTypeName,
      valuesRegistry[variableJson.valueTypeName]?.deserialize(
        variableJson.initialValue
      )
    );
    variable.label = variableJson?.label ?? variable.label;
    variable.metadata = variableJson?.metadata ?? variable.metadata;

    if (variableJson.id in variables) {
      throw new Error(`duplicate variable id ${variable.id}`);
    }
    variables[variableJson.id] = variable;
  }

  return variables;
}

function readCustomEventsJSON(
  valuesRegistry: ValueTypeMap,
  customEventsJson: CustomEventJSON[]
) {
  const customEvents: GraphCustomEvents = {};

  for (let i = 0; i < customEventsJson.length; i += 1) {
    const customEventJson = customEventsJson[i];

    const parameters: Socket[] = [];
    (customEventJson.parameters ?? []).forEach((parameterJson) => {
      parameters.push(
        new Socket(
          parameterJson.valueTypeName,
          parameterJson.name,
          valuesRegistry[parameterJson.valueTypeName]?.deserialize(
            parameterJson.defaultValue
          )
        )
      );
    });

    const customEvent = new CustomEvent(
      customEventJson.id,
      customEventJson.name,
      parameters
    );
    customEvent.label = customEventJson?.label ?? customEvent.label;
    customEvent.metadata = customEventJson?.metadata ?? customEvent.metadata;

    if (customEvent.id in customEvents) {
      throw new Error(`duplicate variable id ${customEvent.id}`);
    }
    customEvents[customEvent.id] = customEvent;
  }

  return customEvents;
}
