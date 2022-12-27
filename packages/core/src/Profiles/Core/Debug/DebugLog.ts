import { Fiber } from '../../../Execution/Fiber';
import { IGraph } from '../../../Graphs/Graph';
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
    graph: IGraph,
    private readonly logger: ILogger
  ) {
    super(
      description,
      graph,
      [
        new Socket('flow', 'flow'),
        new Socket('string', 'text'),
        new Socket('string', 'severity', 'info', undefined, [
          'verbose',
          'info',
          'warning',
          'error'
        ])
      ],
      [new Socket('flow', 'flow')]
    );
  }

  triggered(fiber: Fiber, triggeredSocketName: string) {
    const text = this.readInput<string>('text');
    switch (this.readInput<string>('severity')) {
      case 'verbose':
        this.logger.verbose(text);
        break;
      case 'info':
        this.logger.info(text);
        break;
      case 'warning':
        this.logger.warn(text);
        break;
      case 'error':
        this.logger.error(text);
        break;
    }

    fiber.commit(this, 'flow');
  }
}
