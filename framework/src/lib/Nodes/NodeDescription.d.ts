import { Graph } from '../Graphs/Graph.js';
import { Node } from './Node.js';
import { NodeCategory } from './NodeCategory.js';
export declare type NodeFactory = (entry: NodeDescription, graph: Graph) => Node;
export declare class NodeDescription {
    readonly typeName: string;
    readonly category: NodeCategory;
    readonly label: string;
    readonly factory: NodeFactory;
    constructor(typeName: string, category: NodeCategory, label: string, factory: NodeFactory);
}
//# sourceMappingURL=NodeDescription.d.ts.map