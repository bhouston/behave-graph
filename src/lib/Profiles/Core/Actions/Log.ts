import { Node } from '../../../Nodes/Node.js';
import { NodeEvalContext } from '../../../Nodes/NodeEvalContext.js';
import { Socket } from '../../../Sockets/Socket.js';
import { ILogger } from '../Providers/ILogger.js';

export class Log extends Node {
  constructor() {
    super(
      'Action',
      'action/log',
      [new Socket('flow', 'flow'), new Socket('string', 'text')],
      [new Socket('flow', 'flow')],
      (context: NodeEvalContext) => {
        const logger =
          context.graph.registry.implementations.get<ILogger>('ILogger');
        logger.info(context.readInput('text'));
      }
    );
  }
}
