import Node from '../../Node';
import NodeEvalContext from '../../NodeEvalContext';
import FlowSocket from '../../../Sockets/Typed/FlowSocket';
import StringSocket from '../../../Sockets/Typed/StringSocket';
import Socket from '../../../Sockets/Socket';

export default class StateSet extends Node {
  constructor(name:string, socketFactory: (socketName:string) => Socket) {
    super(
      name,
      [new FlowSocket(), new StringSocket('identifier'), socketFactory('value')],
      [new FlowSocket()],
      (context: NodeEvalContext) => {
        context.graph.state.set(context.getInputValue('identifier'), context.getInputValue('value'));
        context.setOutputValue('flow', true);
      },
    );
  }
};
