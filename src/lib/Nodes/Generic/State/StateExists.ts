import BooleanSocket from '../../../Sockets/Typed/BooleanSocket';
import StringSocket from '../../../Sockets/Typed/StringSocket';
import Node from '../../Node';
import NodeEvalContext from '../../NodeEvalContext';

export default class StateExists extends Node {
  constructor() {
    super(
      'state/exists',
      [new StringSocket('identifier')],
      [new BooleanSocket('result')],
      (context:NodeEvalContext) => {
        const identifier = context.getInputValue('identifier');
        const stateValue = context.graph.state.get(identifier);
        context.setOutputValue('result', stateValue !== undefined);
      },
    );
  }
}
