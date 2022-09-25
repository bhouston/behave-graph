import Node from '../../../Nodes/Node';
import NodeEvalContext from '../../../Nodes/NodeEvalContext';
import ILogger from '../../../Providers/ILogger';
import Socket from '../../../Sockets/Socket';

export default class Log extends Node {
  constructor() {
    super(
      'Action',
      'action/log',
      [
        new Socket('flow', 'flow'),
        new Socket('string', 'text'),
      ],
      [
        new Socket('flow', 'flow'),
      ],
      (context: NodeEvalContext) => {
        const logger = context.graph.registry.implementations.get<ILogger>('ILogger');
        logger.info(context.readInput('text'));
      },
    );
  }
}
