import Socket from '../../../Sockets/Socket';
import FlowSocket from '../../../Sockets/Typed/FlowSocket';
import StringSocket from '../../../Sockets/Typed/StringSocket';
import Node from '../../Node';
import NodeEvalContext from '../../NodeEvalContext';

export default class StateSet extends Node {
  constructor(name:string, socketFactory: (socketName:string) => Socket) {
    super(
      'Logic',
      name,
      [new FlowSocket(), new StringSocket('identifier'), socketFactory('value')],
      [new FlowSocket()],
      (context: NodeEvalContext) => {
        context.graph.state.set(context.getInputValue('identifier'), context.getInputValue('value'));
      },
    );
  }
};
