import { CustomEvent } from '../Events/CustomEvent.js';
import { EventEmitter } from '../Events/EventEmitter.js';
import { GraphEvaluator } from '../Graphs/Evaluation/GraphEvaluator.js';
import { SyncExecutionBlock } from '../Graphs/Evaluation/SyncExecutionBlock.js';
import { Graph } from '../Graphs/Graph.js';
import { Variable } from '../Variables/Variable.js';
import { Node } from './Node.js';
export declare class NodeEvalContext {
    readonly syncExecutionBlock: SyncExecutionBlock;
    readonly node: Node;
    readonly graph: Graph;
    readonly graphEvaluator: GraphEvaluator;
    readonly onAsyncCancelled: EventEmitter<void>;
    private readonly cachedInputValues;
    private readonly cachedOutputValues;
    asyncPending: boolean;
    numCommits: number;
    constructor(syncExecutionBlock: SyncExecutionBlock, node: Node);
    private begin;
    cancel(): void;
    finish(): void;
    evalFlow(): void;
    evalImmediate(): void;
    private readInputs;
    private writeOutputs;
    getCustomEvent(customEventId: string): CustomEvent;
    getVariable(variableId: string): Variable;
    readInput<T>(inputName: string): T;
    writeOutput<T>(outputName: string, value: T): void;
    commit(downstreamFlowSocketName: string, syncEvaluationCompletedListener?: (() => void) | undefined): void;
}
//# sourceMappingURL=NodeEvalContext.d.ts.map