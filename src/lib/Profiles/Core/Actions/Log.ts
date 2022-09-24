import ILogger from '../../../Abstractions/ILogger';
import Node from '../../../Nodes/Node';
import NodeEvalContext from '../../../Nodes/NodeEvalContext';
import FlowSocket from '../../../Sockets/Typed/FlowSocket';
import StringSocket from '../../../Sockets/Typed/StringSocket';

export default class Log extends Node {
  constructor() {
    super(
      'Action',
      'action/log',
      [new FlowSocket(), new StringSocket('text')],
      [new FlowSocket()],
      (context: NodeEvalContext) => {
        const logger = context.graph.registry.implementations.get<ILogger>('ILogger');
        logger.info(context.readInput('text'));
      },
    );
  }
}
