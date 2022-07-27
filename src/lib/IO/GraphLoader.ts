import Node from '../Nodes/Node';
import Graph from '../Graphs/Graph';
import NodeRegistry from '../Nodes/NodeRegistry';

// Purpose:
//  - loads a node graph

export default class GraphLoader {
  public graph = new Graph();

  parse(json: any, nodeRegistry: NodeRegistry) {
    const nodesJson = json;

    // create new BehaviorNode instances for each node in the json.
    for (let i = 0; i < nodesJson.length; i += 1) {
      const nodeJson = nodesJson[i];
      const nodeName = nodeJson.type;
      const node = nodeRegistry.create(nodeName);

      // TODO: apply nodeJson.inputs to node.
      this.graph.nodes.push(node);
    }

    // connect up the graph edges from BehaviorNode inputs to outputs.  This is required to follow execution
    this.graph.nodes.forEach((node) => {
      // initialize the inputs by resolving to the reference nodes.
      node.inputSockets.forEach((inputName, index) => {
        const inputSocket = node.getInputSocket(inputName);

        if (inputSocket.links.length > 0) {
          const uplinkNode = this.behavior.nodes[input.node];
          const uplinkOutput = uplink.outputs[input.output];
          if (!uplinkOutput.downlinks) {
            uplinkOutput.downlinks = [];
          }
          uplinkOutput.downlinks.push({
            node: value.node,
            input: input.name,
          });
        }
      });
    });
  }
}
