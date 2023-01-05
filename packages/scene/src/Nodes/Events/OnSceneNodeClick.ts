import {
  EventNode,
  IGraphApi,
  NodeDescription,
  Socket
} from '@behave-graph/core';

// very 3D specific.
export class OnSceneNodeClick extends EventNode {
  public static Description = new NodeDescription(
    'scene/nodeClick',
    'Event',
    'On Node Click',
    (description, graph) => new OnSceneNodeClick(description, graph)
  );

  constructor(description: NodeDescription, graph: IGraphApi) {
    super(
      description,
      graph,
      [],
      [new Socket('flow', 'flow'), new Socket('float', 'nodeIndex')]
    );
  }
}
