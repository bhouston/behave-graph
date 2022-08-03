import Graph from './Graph';
import {
  GraphJSON, InputJSON, LinkJSON, NodeJSON,
} from './GraphJSON';

export default function writeGraphToJSON(graph: Graph): GraphJSON {
  const graphJson: GraphJSON = [];

  // create new BehaviorNode instances for each node in the json.
  graph.nodes.forEach((node) => {
    const nodeJson: NodeJSON = {
      type: node.typeName,
    };

    const inputsJson: NodeJSON['inputs'] = {};

    node.inputSockets.forEach((inputSocket) => {
      const inputJson: InputJSON = {};

      if (inputSocket.links.length === 0) {
        inputJson.value = inputSocket.value;
      } else {
        const linksJson: LinkJSON[] = [];
        inputSocket.links.forEach((nodeSocketRef) => {
          linksJson.push({
            node: nodeSocketRef.nodeIndex,
            socket: nodeSocketRef.socketName,
          });
        });

        inputJson.links = linksJson;
      }

      inputsJson[inputSocket.name] = inputJson;
    });
    nodeJson.inputs = inputsJson;

    graphJson.push(nodeJson);
  });

  return graphJson;
}
