import BooleanSocket from '../../../Sockets/Typed/BooleanSocket';
import FlowSocket from '../../../Sockets/Typed/FlowSocket';
import Node from '../../Node';
import NodeEvalContext from '../../NodeEvalContext';

export default class FlipFlop extends Node {
  private isOn = true;

  constructor() {
    super(
      'Flow',
      'flow/flipFlop',
      [
        new FlowSocket(),
      ],
      [
        new FlowSocket('on'),
        new FlowSocket('off'),
        new BooleanSocket('isOn'),
      ],
      (context: NodeEvalContext) => {
        context.writeOutput('isOn', this.isOn);
        context.commit(this.isOn ? 'on' : 'off');
        this.isOn = !this.isOn;
      },
    );
  }
}
