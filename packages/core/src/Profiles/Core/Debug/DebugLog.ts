import { Fiber } from '../../../Execution/Fiber';
import { Graph } from '../../../Graphs/Graph';
import { FlowNode } from '../../../Nodes/FlowNode';
import { NodeDescription } from '../../../Nodes/Registry/NodeDescription';
import { Socket } from '../../../Sockets/Socket';
import { ILogger } from '../Abstractions/ILogger';

export class Log extends FlowNode {
  public static Description = (logger: ILogger) =>
    new NodeDescription(
      'debug/log',
      'Action',
      'Debug Log',
      (description, graph) => new Log(description, graph, logger)
    );

  constructor(
    description: NodeDescription,
    graph: Graph,
    private readonly logger: ILogger
  ) {
    super(
      description,
      graph,
      [new Socket('flow', 'flow'), new Socket('string', 'text')],
      [new Socket('flow', 'flow')]
    );
  }

  triggered(fiber: Fiber, triggeredSocketName: string) {
    this.logger.info(this.readInput('text'));
    fiber.commit(this, 'flow');
  }
}
