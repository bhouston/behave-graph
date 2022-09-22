import ILoggerConnector from '../../../Connectors/ILoggerConnector';
import FlowSocket from '../../../Sockets/Typed/FlowSocket';
import StringSocket from '../../../Sockets/Typed/StringSocket';
import Node from '../../Node';
import NodeEvalContext from '../../NodeEvalContext';

export default class Log extends Node {
  constructor() {
    super(
      'Action',
      'action/log',
      [new FlowSocket(), new StringSocket('text')],
      [new FlowSocket()],
      (context: NodeEvalContext) => {
        const logger = context.graph.registry.connectors.get<ILoggerConnector>('ILoggerConnector');
        logger.info(context.getInputValue('text'));
      },
    );
  }
}
