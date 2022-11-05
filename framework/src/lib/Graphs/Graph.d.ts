import { CustomEvent } from '../Events/CustomEvent.js';
import { Metadata } from '../Metadata.js';
import { Node } from '../Nodes/Node.js';
import { NodeTypeRegistry } from '../Nodes/NodeTypeRegistry.js';
import { Registry } from '../Registry.js';
import { Variable } from '../Variables/Variable.js';
export declare class Graph {
    readonly registry: Registry;
    name: string;
    readonly nodes: {
        [id: string]: Node;
    };
    readonly variables: {
        [id: string]: Variable;
    };
    readonly customEvents: {
        [id: string]: CustomEvent;
    };
    metadata: Metadata;
    readonly dynamicNodeRegistry: NodeTypeRegistry;
    version: number;
    constructor(registry: Registry);
    updateDynamicNodeDescriptions(): void;
    createNode(nodeTypeName: string, nodeId?: string): Node;
}
//# sourceMappingURL=Graph.d.ts.map