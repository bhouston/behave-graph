import Node from '../../../Nodes/Node';
import NodeEvalContext from '../../../Nodes/NodeEvalContext';

export default class Branch extends Node {
  constructor() {
    super(
      'Flow',
      'flow/branch',
      [
        new Socket('flow'),
        new Socket('string', 'condition'),
      ],
      [
        new Socket('flow', 'true'),
        new Socket('flow', 'false'),
      ],
      (context: NodeEvalContext) => {
        context.commit(context.readInput('condition') ? 'true' : 'false');
      },
    );
  }
}
