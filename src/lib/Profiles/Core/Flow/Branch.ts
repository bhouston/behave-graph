import { Node } from '../../../Nodes/Node';
import { NodeEvalContext } from '../../../Nodes/NodeEvalContext';
import { Socket } from '../../../Sockets/Socket';

export class Branch extends Node {
  constructor() {
    super(
      'Flow',
      'flow/branch',
      [new Socket('flow', 'flow'), new Socket('boolean', 'condition')],
      [new Socket('flow', 'true'), new Socket('flow', 'false')],
      (context: NodeEvalContext) => {
        context.commit(
          context.readInput<boolean>('condition') === true ? 'true' : 'false'
        );
      }
    );
  }
}
