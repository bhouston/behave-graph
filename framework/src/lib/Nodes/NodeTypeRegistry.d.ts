import { NodeDescription } from './NodeDescription.js';
export declare class NodeTypeRegistry {
    private readonly typeNameToNodeDescriptions;
    clear(): void;
    register(...descriptions: Array<NodeDescription>): void;
    contains(typeName: string): boolean;
    get(typeName: string): NodeDescription;
    getAllNames(): string[];
    getAllDescriptions(): NodeDescription[];
}
//# sourceMappingURL=NodeTypeRegistry.d.ts.map