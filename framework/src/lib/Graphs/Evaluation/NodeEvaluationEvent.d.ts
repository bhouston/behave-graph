import { Node } from '../../Nodes/Node.js';
import { NodeEvaluationType } from './NodeEvaluationType.js';
export declare class NodeEvaluationEvent {
    node: Node;
    nodeEvaluationType: NodeEvaluationType;
    async: boolean;
    constructor(node: Node, nodeEvaluationType: NodeEvaluationType, async: boolean);
}
//# sourceMappingURL=NodeEvaluationEvent.d.ts.map