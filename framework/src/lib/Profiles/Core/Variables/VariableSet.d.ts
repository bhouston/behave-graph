import { Graph } from '../../../Graphs/Graph.js';
import { Node } from '../../../Nodes/Node.js';
import { NodeDescription } from '../../../Nodes/NodeDescription.js';
import { Variable } from '../../../Variables/Variable.js';
export declare class VariableSet extends Node {
    readonly variable: Variable;
    static GetDescription(graph: Graph, variableId: string): NodeDescription;
    constructor(description: NodeDescription, graph: Graph, variable: Variable);
}
//# sourceMappingURL=VariableSet.d.ts.map