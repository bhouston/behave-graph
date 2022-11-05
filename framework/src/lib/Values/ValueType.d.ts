export declare class ValueType<TValue = any, TJson = any> {
    readonly name: string;
    readonly creator: () => TValue;
    readonly deserialize: (value: TJson) => TValue;
    readonly serialize: (value: TValue) => TJson;
    constructor(name: string, creator: () => TValue, deserialize: (value: TJson) => TValue, serialize: (value: TValue) => TJson);
}
//# sourceMappingURL=ValueType.d.ts.map