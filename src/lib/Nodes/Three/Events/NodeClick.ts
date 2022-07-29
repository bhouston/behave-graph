import FlowSocket from '../../../Sockets/Typed/FlowSocket';
import NumberSocket from '../../../Sockets/Typed/NumberSocket';
import Node from '../../Node';
import NodeEvalContext from '../../NodeEvalContext';

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
        context.setOutputValue('eval', true);
        context.setOutputValue('nodeIndex', -1); // TODO: Replace with real value.
      },
    );
  }
}
