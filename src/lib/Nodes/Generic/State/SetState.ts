import Node from '../../Node';
import NodeEvalContext from '../../NodeEvalContext';
import FlowSocket from '../../../Sockets/Typed/FlowSocket';
import NumberSocket from '../../../Sockets/Typed/NumberSocket';
import StringSocket from '../../../Sockets/Typed/StringSocket';

export default class SetStateNumber extends Node {
  constructor() {
    super(
      'state/setNumber',
      [new FlowSocket(), new StringSocket('identifier'), new NumberSocket('value')],
      [new FlowSocket()],
      (context: NodeEvalContext) => {
        context.graph.state.set(context.getInputValue('identifier'), context.getInputValue('value'));
      },
    );
  }
};
