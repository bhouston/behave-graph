import ILogger from '../../../Abstractions/ILogger';
import Node from '../../../Nodes/Node';
import NodeEvalContext from '../../../Nodes/NodeEvalContext';

export default class Log extends Node {
  constructor() {
    super(
      'Action',
      'action/log',
      [new Socket('flow'), new Socket('string', 'text')],
      [new Socket('flow')],
      (context: NodeEvalContext) => {
        const logger = context.graph.registry.implementations.get<ILogger>('ILogger');
        logger.info(context.readInput('text'));
      },
    );
  }
}
