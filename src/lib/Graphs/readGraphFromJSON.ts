import Debug from '../Debug';
import NodeSocketRef from '../Nodes/NodeSocketRef';
import Graph from './Graph';
import GraphTypeRegistry from './GraphTypeRegistry';
// Purpose:
//  - loads a node graph

export default function readGraphFromJSON(nodesJson: any, graphTypeRegistry: GraphTypeRegistry): Graph {
  const graph = new Graph();

  // console.log('input JSON', JSON.stringify(nodesJson, null, 2));

  if (nodesJson.length === 0) {
    console.warn('loadGraph: no nodes specified');
  }

  // create new BehaviorNode instances for each node in the json.
  for (let i = 0; i < nodesJson.length; i += 1) {
    const nodeJson = nodesJson[i];

    if (nodeJson.type === undefined) {
      throw new Error('loadGraph: no type for node');
    }
    const nodeName = nodeJson.type as string;
    const node = graphTypeRegistry.createNode(nodeName);

    const inputsJson = nodeJson.inputs as {[key:string]:any};
    node.inputSockets.forEach((socket) => {
      // warn if no definition.
      if (inputsJson[socket.name] === undefined) {
        Debug.warn(`loadGraph: no input socket value or links for node socket: ${nodeName}.${socket.name}`);
        return;
      }

      const inputJson = inputsJson[socket.name] as {[key:string]:any};
      if (inputJson.value !== undefined) {
        // eslint-disable-next-line no-param-reassign
        socket.value = inputJson.value;
      }

      if (inputJson.links !== undefined) {
        const linksJson = inputJson.links as Array<any>;
        linksJson.forEach((linkJson) => {
          socket.links.push(new NodeSocketRef(linkJson.node, linkJson.socket));
        });
      }
    });

    // TODO: apply nodeJson.inputs to node.
    graph.nodes.push(node);
  }

  // connect up the graph edges from BehaviorNode inputs to outputs.  This is required to follow execution
  graph.nodes.forEach((node, nodeIndex) => {
    // console.log(node);
    // initialize the inputs by resolving to the reference nodes.
    node.inputSockets.forEach((inputSocket) => {
      // console.log(inputSocket);
      inputSocket.links.forEach((nodeSocketRef) => {
        // console.log(nodeSocketRef);
        const upstreamOutputSocket = graph.nodes[nodeSocketRef.nodeIndex].getOutputSocket(nodeSocketRef.socketName);
        upstreamOutputSocket.links.push(new NodeSocketRef(nodeIndex, inputSocket.name));
      });
    });
  });

  // console.log('output Graph', JSON.stringify(graph, null, 2));
  return graph;
}
