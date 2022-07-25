import Node from '../Core/Nodes/Node';
import Graph from '../Graphs/Graph';
import {
  GlobalNodeSpecRegistry,
  NodeSpecRegistry,
} from '../Registry/NodeSpecRegistry';

// Purpose:
//  - loads a node graph

export default class GraphLoader {
  public graph = new Graph();

  parse(json: any, nodeSpecRegistry: NodeSpecRegistry) {
    const nodesJson = json;

    // create new BehaviorNode instances for each node in the json.
    for (let i = 0; i < nodesJson.length; i += 1) {
      const nodeJson = nodesJson[i];
      const nodeType = nodeJson.type;
      const definitions = nodeSpecRegistry.filter(
        (item) => item.type === nodeType,
      );

      if (definitions.length <= 0) {
        throw new Error(
          `Can not find Behavior Node Definition for ${nodeType}`,
        );
      }
      if (definitions.length > 1) {
        throw new Error(
          `Too many matching Behavior Node Definition for ${nodeType}`,
        );
      }

      this.graph.nodes.push(new Node(i, definitions[0], nodeJson.inputs));
    }

    // connect up the graph edges from BehaviorNode inputs to outputs.  This is required to follow execution
    this.graph.nodes.forEach((node) => {
      // initialize the inputs by resolving to the reference nodes.
      node.inputSockets.forEach((inputName, index) => {
        const input = node.inputSockets[inputName];

        if (input.type === 'link') {
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
