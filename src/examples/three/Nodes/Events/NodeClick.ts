import {
  FlowSocket, Node, NodeEvalContext, NumberSocket,
} from '../../../../../dist/lib/index';

// very 3D specific.
export default class NodeClick extends Node {
  constructor() {
    super(
      'event/nodeClick',
      [],
      [
        new FlowSocket(),
        new NumberSocket('nodeIndex'),
      ],
      (context: NodeEvalContext) => {
        context.setOutputValue('nodeIndex', -1); // TODO: Replace with real value.
      },
    );
  }
}
