import { Link } from '../../Nodes/Link.js';
import { Socket } from '../../Sockets/Socket.js';
import { GraphEvaluator } from './GraphEvaluator.js';
export declare class SyncExecutionBlock {
    graphEvaluator: GraphEvaluator;
    nextEval: Link | null;
    private readonly syncEvaluationCompletedListenerStack;
    private readonly graph;
    constructor(graphEvaluator: GraphEvaluator, nextEval: Link | null, syncEvaluationCompletedListener?: (() => void) | undefined);
    resolveInputValueFromSocket(inputSocket: Socket): any;
    commit(outputFlowSocket: Link, syncEvaluationCompletedListener?: (() => void) | undefined): void;
    executeStep(): boolean;
}
//# sourceMappingURL=SyncExecutionBlock.d.ts.map