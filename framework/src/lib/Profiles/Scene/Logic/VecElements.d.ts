import { Graph } from '../../../Graphs/Graph.js';
import { Node } from '../../../Nodes/Node.js';
import { NodeDescription } from '../../../Nodes/NodeDescription.js';
export declare class VecElements<T> extends Node {
    constructor(description: NodeDescription, graph: Graph, valueTypeName: string, elementNames: string[] | undefined, toArray: (value: T, array: number[], offset: number) => void);
}
//# sourceMappingURL=VecElements.d.ts.map