import { Graph } from '../../Graphs/Graph.js';
import { Node } from '../Node.js';
import { NodeDescription } from '../NodeDescription.js';
export declare class In2Out1FuncNode<In1, In2, Out1> extends Node {
    readonly binaryEvalFunc: (a: In1, b: In2) => Out1;
    readonly inputNames: string[];
    constructor(description: NodeDescription, graph: Graph, inputValueTypes: string[], outputValueType: string, binaryEvalFunc: (a: In1, b: In2) => Out1, inputNames?: string[]);
}
//# sourceMappingURL=In2Out1FuncNode.d.ts.map