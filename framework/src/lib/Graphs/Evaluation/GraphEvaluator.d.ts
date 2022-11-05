import { EventEmitter } from '../../Events/EventEmitter.js';
import { Link } from '../../Nodes/Link.js';
import { Node } from '../../Nodes/Node.js';
import { Graph } from '../Graph.js';
import { NodeEvaluationEvent } from './NodeEvaluationEvent.js';
export declare class GraphEvaluator {
    readonly graph: Graph;
    private readonly executionBlockQueue;
    readonly asyncNodes: Node[];
    readonly interruptibleAsyncNodes: Node[];
    readonly onNodeEvaluation: EventEmitter<NodeEvaluationEvent>;
    constructor(graph: Graph);
    asyncCommit(outputFlowSocket: Link, syncEvaluationCompletedListener: (() => void) | undefined): void;
    executeAllSync(limitInSeconds?: number, limitInSteps?: number): number;
    executeAllAsync(limitInSeconds?: number, limitInSteps?: number): Promise<number>;
}
//# sourceMappingURL=GraphEvaluator.d.ts.map