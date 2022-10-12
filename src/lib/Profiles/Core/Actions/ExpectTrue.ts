import { Assert } from '../../../Diagnostics/Assert.js';
import { Node } from '../../../Nodes/Node.js';
import { NodeEvalContext } from '../../../Nodes/NodeEvalContext.js';
import { Socket } from '../../../Sockets/Socket.js';

export class ExpectTrue extends Node {
  constructor() {
    super(
      'Action',
      'assert/expectTrue',
      [
        new Socket('flow', 'flow'),
        new Socket('boolean', 'condition'),
        new Socket('string', 'description')
      ],
      [new Socket('flow', 'flow')],
      (context: NodeEvalContext) => {
        Assert.mustBeTrue(
          context.readInput('condition'),
          context.readInput('description')
        );
      }
    );
  }
}
