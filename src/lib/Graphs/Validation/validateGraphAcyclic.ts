import { Node } from '../../Nodes/Node.js';
import { Graph } from '../Graph.js';

export function validateGraphAcyclic(graph: Graph): string[] {
  // apparently if you can topological sort, it is a DAG according to: https://stackoverflow.com/questions/4168/graph-serialization/4577#4577

  // instead of modifying the graph, I will use metadata to mark it in place.
  Object.values(graph.nodes).forEach((node) => {
    // eslint-disable-next-line no-param-reassign
    node.metadata['dag.marked'] = 'false';
  });

  // it appears that we can just keep trimming nodes whose input sockets have no connections.
  // if we can remove all nodes, that means that there are no cycles.

  const nodesToMark: Node[] = [];

  do {
    // clear array: https://stackoverflow.com/a/1232046
    nodesToMark.length = 0;

    Object.values(graph.nodes).forEach((node) => {
      // ignore existing marked nodes.
      if (node.metadata['dag.marked'] === 'true') {
        return;
      }

      let inputSocketsConnected = false;
      Object.values(node.inputSockets).forEach((inputSocket) => {
        inputSocket.links.forEach((link) => {
          // is the other end marked?  If not, then it is still connected.
          if (graph.nodes[link.nodeId].metadata['dag.marked'] === 'false') {
            inputSocketsConnected = true;
          }
        });
      });
      if (!inputSocketsConnected) {
        nodesToMark.push(node);
      }
    });
    nodesToMark.forEach((node) => {
      // eslint-disable-next-line no-param-reassign
      node.metadata['dag.marked'] = 'true';
    });
  } while (nodesToMark.length > 0);

  const errorList: string[] = [];

  // output errors for each unmarked node
  // also remove the metadata related to DAG marking
  Object.values(graph.nodes).forEach((node) => {
    if (node.metadata['dag.marked'] === 'false') {
      errorList.push(
        `node ${node.description.typeName} is part of a cycle, not a directed acyclic graph`
      );
    }
    // eslint-disable-next-line no-param-reassign
    delete node.metadata['dag.marked'];
  });

  return errorList;
}
