import { IGraph } from '../../../Graphs/Graph';
import { EventNode } from '../../../Nodes/EventNode';
import { NodeDescription } from '../../../Nodes/Registry/NodeDescription';
import { Socket } from '../../../Sockets/Socket';

// very 3D specific.
export class OnSceneNodeClick extends EventNode {
  public static Description = new NodeDescription(
    'scene/nodeClick',
    'Event',
    'On Node Click',
    (description, graph) => new OnSceneNodeClick(description, graph)
  );

  constructor(description: NodeDescription, graph: IGraph) {
    super(
      description,
      graph,
      [],
      [new Socket('flow', 'flow'), new Socket('float', 'nodeIndex')]
    );
  }
}
