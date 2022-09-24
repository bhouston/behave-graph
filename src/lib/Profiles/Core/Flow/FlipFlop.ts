import Node from '../../../Nodes/Node';
import NodeEvalContext from '../../../Nodes/NodeEvalContext';
import BooleanSocket from '../../../Sockets/Typed/BooleanSocket';
import FlowSocket from '../../../Sockets/Typed/FlowSocket';

export default class FlipFlop extends Node {
  private isOn = true;

  constructor() {
    super(
      'Flow',
      'flow/flipFlop',
      [
        new Socket('flow',),
      ],
      [
        new Socket('flow','on'),
        new Socket('flow','off'),
        new Socket('string','isOn'),
      ],
      (context: NodeEvalContext) => {
        context.writeOutput('isOn', this.isOn);
        context.commit(this.isOn ? 'on' : 'off');
        this.isOn = !this.isOn;
      },
    );
  }
}
