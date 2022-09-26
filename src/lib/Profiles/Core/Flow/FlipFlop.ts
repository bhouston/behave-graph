import Node from '../../../Nodes/Node';
import NodeEvalContext from '../../../Nodes/NodeEvalContext';
import Socket from '../../../Sockets/Socket';

export default class FlipFlop extends Node {
  private isOn = true;

  constructor() {
    super(
      'Flow',
      'flow/flipFlop',
      [
        new Socket('flow', 'flow'),
      ],
      [
        new Socket('flow', 'on'),
        new Socket('flow', 'off'),
        new Socket('boolean', 'isOn'),
      ],
      (context: NodeEvalContext) => {
        context.writeOutput('isOn', this.isOn);
        context.commit(this.isOn ? 'on' : 'off');
        this.isOn = !this.isOn;
      },
    );
  }
}
