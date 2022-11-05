import { ValueType } from './ValueType.js';
export declare class ValueTypeRegistry {
    private readonly valueTypeNameToValueType;
    constructor();
    register(...valueTypes: Array<ValueType>): void;
    get(valueTypeName: string): ValueType;
    getAllNames(): string[];
}
//# sourceMappingURL=ValueTypeRegistry.d.ts.map