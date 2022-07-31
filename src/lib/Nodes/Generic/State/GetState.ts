import Node from '../../Node';

import StringSocket from '../../../Sockets/Typed/StringSocket';
import NodeEvalContext from '../../NodeEvalContext';
import NumberSocket from '../../../Sockets/Typed/NumberSocket';

export default class GetStateNumber extends Node {
  constructor() {
    super(
      'state/getNumber',
      [new StringSocket('identifier'), new NumberSocket('defaultValue')],
      [new NumberSocket('value')],
      (context:NodeEvalContext) => {
        const identifier = context.getInputValue('identifier');
        let stateValue = context.graph.state.get(identifier);
        if (stateValue === undefined) {
          stateValue = context.getInputValue('defaultValue');
        }
        context.setOutputValue('value', stateValue);
      },
    );
  }
}
