import Node from '../../../Nodes/Node';
import NodeEvalContext from '../../../Nodes/NodeEvalContext';
import FlowSocket from '../../../Sockets/Typed/FlowSocket';
import NumberSocket from '../../../Sockets/Typed/NumberSocket';

// very 3D specific.
export default class OnSceneNodeClick extends Node {
  constructor() {
    super(
      'Event',
      'event/nodeClick',
      [],
      [
        new FlowSocket(),
        new NumberSocket('nodeIndex'),
      ],
      (context: NodeEvalContext) => {
        context.writeOutput('nodeIndex', -1); // TODO: Replace with real value.
      },
    );
  }
}
