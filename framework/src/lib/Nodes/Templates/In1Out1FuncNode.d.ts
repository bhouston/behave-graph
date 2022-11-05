import { Graph } from '../../Graphs/Graph.js';
import { Node } from '../Node.js';
import { NodeDescription } from '../NodeDescription.js';
export declare class In1Out1FuncNode<In1, Out1> extends Node {
    readonly unaryEvalFunc: (a: In1) => Out1;
    readonly inputNames: string[];
    constructor(description: NodeDescription, graph: Graph, inputValueTypes: string[], outputValueType: string, unaryEvalFunc: (a: In1) => Out1, inputNames?: string[]);
}
//# sourceMappingURL=In1Out1FuncNode.d.ts.map