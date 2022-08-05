import Debug from '../../Debug';
import NodeSocketRef from '../../Nodes/NodeSocketRef';
import Graph from '../Graph';
import GraphRegistry from '../GraphRegistry';
import { GraphJSON } from './GraphJSON';

// Purpose:
//  - loads a node graph
export default function readGraphFromJSON(graphJson: GraphJSON, registry: GraphRegistry): Graph {
  const graph = new Graph();

  graph.name = graphJson.name || graph.name;
  graph.metadata = graphJson.metadata || graph.metadata;

  // console.log('input JSON', JSON.stringify(nodesJson, null, 2));
  const nodesJson = graphJson.nodes;

  if (nodesJson.length === 0) {
    console.warn('loadGraph: no nodes specified');
  }

  // create new BehaviorNode instances for each node in the json.
  for (let i = 0; i < nodesJson.length; i += 1) {
    const nodeJson = nodesJson[i];

    if (nodeJson.type === undefined) {
      throw new Error('loadGraph: no type for node');
    }
    const nodeName = nodeJson.type;
    const node = registry.nodes.create(nodeName, nodeJson.id);

    node.label = nodeJson.label || node.label;
    node.metadata = nodeJson.metadata || node.metadata;

    const inputsJson = nodeJson.inputs;
    if (inputsJson !== undefined) {
      node.inputSockets.forEach((socket) => {
      // warn if no definition.
        if (inputsJson?.[socket.name] === undefined) {
          Debug.logWarn(`loadGraph: no input socket value or links for node socket: ${nodeName}.${socket.name}`);
          return;
        }

        const inputJson = inputsJson[socket.name];
        if (inputJson.value !== undefined) {
        // eslint-disable-next-line no-param-reassign
          socket.value = registry.values.get(socket.valueTypeName).parse(inputJson.value);
        }

        if (inputJson.links !== undefined) {
          const linksJson = inputJson.links;
          linksJson.forEach((linkJson) => {
            socket.links.push(new NodeSocketRef(linkJson.nodeId, linkJson.socket));
          });
        }
      });

      // validate that there are no additional input sockets specified that were not read.
      Object.keys(inputsJson).forEach((inputName) => {
        const inputSocket = node.inputSockets.find((socket) => socket.name === inputName);
        if (inputSocket === undefined) {
          throw new Error(`node '${node.typeName}' specifies an input '${inputName}' that doesn't exist on its node type`);
        }
      });
    }

    // TODO: apply nodeJson.inputs to node.
    if (graph.nodes[node.id] !== undefined) {
      throw new Error(`multiple nodes with the same "unique id": ${node.id}`);
    }
    graph.nodes[node.id] = node;
  }

  // connect up the graph edges from BehaviorNode inputs to outputs.  This is required to follow execution
  Object.values(graph.nodes).forEach((node) => {
    // console.log(node);
    // initialize the inputs by resolving to the reference nodes.
    node.inputSockets.forEach((inputSocket) => {
      // console.log(inputSocket);
      inputSocket.links.forEach((nodeSocketRef) => {
        // console.log(nodeSocketRef);
        const upstreamNode = graph.nodes[nodeSocketRef.nodeId];
        if (upstreamNode === undefined) {
          throw new Error(`node '${node.typeName}' specifies an input '${inputSocket.name}' whose link goes to `
          + `a nonexistent upstream node id ${nodeSocketRef.nodeId}`);
        }
        const upstreamOutputSocket = upstreamNode.outputSockets.find((socket) => socket.name === nodeSocketRef.socketName);
        if (upstreamOutputSocket === undefined) {
          throw new Error(`node '${node.typeName}' specifies an input '${inputSocket.name}' whose link goes to `
          + `a nonexistent output '${nodeSocketRef.socketName}' on upstream node '${upstreamNode.typeName}'`);
        }
        upstreamOutputSocket.links.push(new NodeSocketRef(node.id, inputSocket.name));
      });
    });
  });

  // console.log('output Graph', JSON.stringify(graph, null, 2));
  return graph;
}
