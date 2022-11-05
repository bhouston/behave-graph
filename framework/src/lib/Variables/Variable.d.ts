import { EventEmitter } from '../Events/EventEmitter.js';
import { Metadata } from '../Metadata.js';
export declare class Variable {
    readonly id: string;
    readonly name: string;
    readonly valueTypeName: string;
    initialValue: any;
    private value;
    label: string;
    metadata: Metadata;
    version: number;
    readonly onChanged: EventEmitter<Variable>;
    constructor(id: string, name: string, valueTypeName: string, initialValue: any);
    get(): any;
    set(newValue: any): void;
}
//# sourceMappingURL=Variable.d.ts.map