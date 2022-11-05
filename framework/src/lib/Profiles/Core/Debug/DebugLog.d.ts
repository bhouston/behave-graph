import { Graph } from '../../../Graphs/Graph.js';
import { Node } from '../../../Nodes/Node.js';
import { NodeDescription } from '../../../Nodes/NodeDescription.js';
import { ILogger } from '../Abstractions/ILogger.js';
export declare class Log extends Node {
    private readonly logger;
    static Description: (logger: ILogger) => NodeDescription;
    constructor(description: NodeDescription, graph: Graph, logger: ILogger);
}
//# sourceMappingURL=DebugLog.d.ts.map