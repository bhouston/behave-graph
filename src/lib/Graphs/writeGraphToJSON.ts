import Graph from './Graph';

export default function writeGraphToJSON(graph: Graph): any {
  const graphJson: any[] = [];
  // create new BehaviorNode instances for each node in the json.
  graph.nodes.forEach((node) => {
    const nodeJson: { [index:string]: any} = {
      type: node.nodeName,
    };

    const inputsJson: { [index:string]: any} = {};
    node.inputSockets.forEach((inputSocket) => {
      const inputJson: { [index:string]: any} = {};

      if (inputSocket.links.length === 0) {
        inputJson.value = inputSocket.value;
      } else {
        const linksJson: { [index:string]: any}[] = [];
        inputSocket.links.forEach((nodeSocketRef) => {
          linksJson.push({
            nodeIndex: nodeSocketRef.nodeIndex,
            socketName: nodeSocketRef.socketName,
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
