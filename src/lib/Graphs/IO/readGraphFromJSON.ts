import { Logger } from '../../Diagnostics/Logger.js';
import { CustomEvent } from '../../Events/CustomEvent.js';
import { Link } from '../../Nodes/Link.js';
import { Node } from '../../Nodes/Node.js';
import { Registry } from '../../Registry.js';
import { Socket } from '../../Sockets/Socket.js';
import { Variable } from '../../Variables/Variable.js';
import { Graph } from '../Graph.js';
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
export function readGraphFromJSON(
  graphJson: GraphJSON,
  registry: Registry
): Graph {
  const graph = new Graph(registry);

  graph.name = graphJson?.name ?? graph.name;
  graph.metadata = graphJson?.metadata ?? graph.metadata;

  if ('variables' in graphJson) {
    readVariablesJSON(graph, graphJson.variables ?? []);
  }
  if ('customEvents' in graphJson) {
    readCustomEventsJSON(graph, graphJson.customEvents ?? []);
  }

  // register node based on variables and custom events.
  graph.registerLocalNodeTypes();

  // console.log('input JSON', JSON.stringify(nodesJson, null, 2));
  const nodesJson = graphJson?.nodes ?? [];

  if (nodesJson.length === 0) {
    Logger.warn('readGraphFromJSON: no nodes specified');
  }

  // create new BehaviorNode instances for each node in the json.
  for (let i = 0; i < nodesJson.length; i += 1) {
    const nodeJson = nodesJson[i];
    readNodeJSON(graph, nodeJson);
  }

  // connect up the graph edges from BehaviorNode inputs to outputs.  This is required to follow execution
  Object.values(graph.nodes).forEach((node) => {
    // console.log(node);
    // initialize the inputs by resolving to the reference nodes.
    node.inputSockets.forEach((inputSocket) => {
      // console.log(inputSocket);
      inputSocket.links.forEach((link) => {
        // console.log(link);
        if (!(link.nodeId in graph.nodes)) {
          throw new Error(
            `node '${node.typeName}' specifies an input '${inputSocket.name}' whose link goes to ` +
              `a nonexistent upstream node id ${link.nodeId}`
          );
        }
        const upstreamNode = graph.nodes[link.nodeId];
        const upstreamOutputSocket = upstreamNode.outputSockets.find(
          (socket) => socket.name === link.socketName
        );
        if (upstreamOutputSocket === undefined) {
          throw new Error(
            `node '${node.typeName}' specifies an input '${inputSocket.name}' whose link goes to ` +
              `a nonexistent output '${link.socketName}' on upstream node '${upstreamNode.typeName}'`
          );
        }

        // add, only if unique
        const upstreamLink = new Link(node.id, inputSocket.name);
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

    node.outputSockets.forEach((outputSocket) => {
      // console.log(inputSocket);
      outputSocket.links.forEach((link) => {
        // console.log(link);

        if (!(link.nodeId in graph.nodes)) {
          throw new Error(
            `node '${node.typeName}' specifies an output '${outputSocket.name}' whose link goes to ` +
              `a nonexistent downstream node id ${link.nodeId}`
          );
        }

        const downstreamNode = graph.nodes[link.nodeId];
        const downstreamInputSocket = downstreamNode.inputSockets.find(
          (socket) => socket.name === link.socketName
        );
        if (downstreamInputSocket === undefined) {
          throw new Error(
            `node '${node.typeName}' specifies an output '${outputSocket.name}' whose link goes to ` +
              `a nonexistent input '${link.socketName}' on downstream node '${downstreamNode.typeName}'`
          );
        }

        // add, only if unique
        const downstreamLink = new Link(node.id, outputSocket.name);
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

  // console.log('output Graph', JSON.stringify(graph, null, 2));
  return graph;
}

function readNodeJSON(graph: Graph, nodeJson: NodeJSON) {
  if (nodeJson.type === undefined) {
    throw new Error('readGraphFromJSON: no type for node');
  }
  const nodeName = nodeJson.type;
  const node = graph.createNode(nodeName, nodeJson.id);
  //console.log(node);

  node.label = nodeJson?.label ?? node.label;
  node.metadata = nodeJson?.metadata ?? node.metadata;

  if (nodeJson.parameters !== undefined) {
    readNodeParameterJSON(graph, node, nodeJson.parameters);
  }
  if (nodeJson.flows !== undefined) {
    readNodeFlowsJSON(graph, node, nodeJson.flows);
  }

  // TODO: apply nodeJson.inputs to node.
  if (node.id in graph.nodes) {
    throw new Error(`multiple nodes with the same "unique id": ${node.id}`);
  }
  graph.nodes[node.id] = node;
}

function readNodeParameterJSON(
  graph: Graph,
  node: Node,
  parametersJson: NodeParametersJSON
) {
  node.inputSockets.forEach((socket) => {
    if (!(socket.name in parametersJson)) {
      return;
    }

    const inputJson = parametersJson[socket.name];
    if ('value' in inputJson) {
      // eslint-disable-next-line no-param-reassign
      socket.value = graph.registry.values
        .get(socket.valueTypeName)
        .deserialize(inputJson.value);
    }

    if ('link' in inputJson) {
      const linkJson = inputJson.link;
      socket.links.push(new Link(linkJson.nodeId, linkJson.socket));
    }
  });

  // validate that there are no additional input sockets specified that were not read.
  Object.keys(parametersJson).forEach((inputName) => {
    const inputSocket = node.inputSockets.find(
      (socket) => socket.name === inputName
    );
    if (inputSocket === undefined) {
      throw new Error(
        `node '${node.typeName}' specifies an input '${inputName}' that doesn't exist on its node type`
      );
    }
  });
}

function readNodeFlowsJSON(graph: Graph, node: Node, flowsJson: FlowsJSON) {
  node.outputSockets.forEach((socket) => {
    if (socket.name in flowsJson) {
      const outputLinkJson = flowsJson[socket.name];
      socket.links.push(new Link(outputLinkJson.nodeId, outputLinkJson.socket));
    }
  });

  // validate that there are no additional input sockets specified that were not read.
  Object.keys(flowsJson).forEach((outputName) => {
    const outputSocket = node.outputSockets.find(
      (socket) => socket.name === outputName
    );
    if (outputSocket === undefined) {
      throw new Error(
        `node '${node.typeName}' specifies an output '${outputName}' that doesn't exist on its node type`
      );
    }
  });
}

function readVariablesJSON(graph: Graph, variablesJson: VariableJSON[]) {
  for (let i = 0; i < variablesJson.length; i += 1) {
    const variableJson = variablesJson[i];

    const variable = new Variable(
      variableJson.id,
      variableJson.name,
      variableJson.valueTypeName,
      graph.registry.values
        .get(variableJson.valueTypeName)
        .deserialize(variableJson.initialValue)
    );
    variable.label = variableJson?.label ?? variable.label;
    variable.metadata = variableJson?.metadata ?? variable.metadata;

    if (variableJson.id in graph.variables) {
      throw new Error(`duplicate variable id ${variable.id}`);
    }
    graph.variables[variableJson.id] = variable;
  }
}

function readCustomEventsJSON(
  graph: Graph,
  customEventsJson: CustomEventJSON[]
) {
  for (let i = 0; i < customEventsJson.length; i += 1) {
    const customEventJson = customEventsJson[i];

    const parameters: Socket[] = [];
    (customEventJson.parameters ?? []).forEach((parameterJson) => {
      parameters.push(
        new Socket(
          parameterJson.valueTypeName,
          parameterJson.name,
          graph.registry.values
            .get(parameterJson.valueTypeName)
            .deserialize(parameterJson.defaultValue)
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

    if (customEvent.id in graph.customEvents) {
      throw new Error(`duplicate variable id ${customEvent.id}`);
    }
    graph.customEvents[customEvent.id] = customEvent;
  }
}
