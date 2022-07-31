import Node from '../../Node';

import StringSocket from '../../../Sockets/Typed/StringSocket';
import NodeEvalContext from '../../NodeEvalContext';
import Socket from '../../../Sockets/Socket';

export default class StateGet extends Node {
  constructor(name:string, socketFactory: (socketName:string) => Socket) {
    super(
      name,
      [new StringSocket('identifier'), socketFactory('defaultValue')],
      [socketFactory('result')],
      (context:NodeEvalContext) => {
        const identifier = context.getInputValue('identifier');
        let stateValue = context.graph.state.get(identifier);
        if (stateValue === undefined) {
          stateValue = context.getInputValue('defaultValue');
        }
        context.setOutputValue('result', stateValue);
      },
    );
  }
}
