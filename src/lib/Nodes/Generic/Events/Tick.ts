import FlowSocket from '../../../Sockets/Typed/FlowSocket';
import Node from '../../Node';
import NodeEvalContext from '../../NodeEvalContext';

export default class Tick extends Node {
  constructor() {
    super(
      'event/tick',
      [],
      [new FlowSocket()],
      (context: NodeEvalContext) => {
        context.setOutputValue('eval', true);
      },
    );
  }
}
