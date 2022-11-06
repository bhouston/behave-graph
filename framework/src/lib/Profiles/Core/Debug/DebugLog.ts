import { Graph } from '../../../Graphs/Graph.js';
import { Node } from '../../../Nodes/Node.js';
import { NodeDescription } from '../../../Nodes/NodeDescription.js';
import { NodeEvalContext } from '../../../Nodes/NodeEvalContext.js';
import { Socket } from '../../../Sockets/Socket.js';
import { ILogger } from '../Abstractions/ILogger.js';

export class Log extends Node {
  public static Description = (logger: ILogger) =>
    new NodeDescription(
      'debug/log',
      'Action',
      'Debug Log',
      (description, graph) => new Log(description, graph, logger)
    );

  constructor(description: NodeDescription, graph: Graph, private readonly logger: ILogger) {
    super(
      description,
      graph,
      [new Socket('flow', 'flow'), new Socket('string', 'text')],
      [new Socket('flow', 'flow')],
      (context: NodeEvalContext) => {
        this.logger.info(context.readInput('text'));
      }
    );
  }
}
