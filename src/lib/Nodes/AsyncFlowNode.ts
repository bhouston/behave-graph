import { Graph } from '../Graphs/Graph.js';
import { Socket } from '../Sockets/Socket.js';
import { FlowNode } from './FlowNode.js';
import { NodeDescription } from './NodeDescription.js';
import { NodeEvalContext } from './NodeEvalContext.js';

export class AsyncFlowNode extends FlowNode {
  public evaluateOnStartup = false;
  public interruptibleAsync = false;
  public cachedContext: NodeEvalContext | undefined = undefined;

  constructor(
    description: NodeDescription,
    graph: Graph,
    inputSocketList: Socket[],
    outputSocketList: Socket[],
    flowEvalFunc: (context: NodeEvalContext) => void
  ) {
    super(description, graph, inputSocketList, outputSocketList, flowEvalFunc);
  }
}
