import Node from '../../../Nodes/Node';
import NodeEvalContext from '../../../Nodes/NodeEvalContext';
import Socket from '../../../Sockets/Socket';

// very 3D specific.
export default class OnSceneNodeClick extends Node {
  constructor() {
    super(
      'Event',
      'event/nodeClick',
      [],
      [
        new Socket('flow', 'flow'),
        new Socket('number', 'nodeIndex'),
      ],
      (context: NodeEvalContext) => {
        context.writeOutput('nodeIndex', -1); // TODO: Replace with real value.
      },
    );
  }
}
