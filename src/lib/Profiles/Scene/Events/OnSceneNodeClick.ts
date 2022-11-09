import { Graph } from '../../../Graphs/Graph.js';
import { EventNode } from '../../../Nodes/EventNode.js';
import { NodeDescription } from '../../../Nodes/Registry/NodeDescription.js';
import { Socket } from '../../../Sockets/Socket.js';

// very 3D specific.
export class OnSceneNodeClick extends EventNode {
  public static Description = new NodeDescription(
    'scene/nodeClick',
    'Event',
    'On Node Click',
    (description, graph) => new OnSceneNodeClick(description, graph)
  );

  constructor(description: NodeDescription, graph: Graph) {
    super(
      description,
      graph,
      [],
      [new Socket('flow', 'flow'), new Socket('float', 'nodeIndex')]
    );
  }
}
