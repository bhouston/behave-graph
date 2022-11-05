import { Graph } from '../../Graphs/Graph.js';
import { Node } from '../Node.js';
import { NodeDescription } from '../NodeDescription.js';
export declare class In0Out1FuncNode<Out1> extends Node {
    readonly nullaryEvalFunc: () => Out1;
    constructor(description: NodeDescription, graph: Graph, outputValueType: string, nullaryEvalFunc: () => Out1);
}
//# sourceMappingURL=In0Out1FuncNode.d.ts.map