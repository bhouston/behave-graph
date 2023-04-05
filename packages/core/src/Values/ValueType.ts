export class ValueType<TValue = any, TJson = any> {
  constructor(
    public readonly name: string,
    public readonly creator: () => TValue,
    public readonly deserialize: (value: TJson) => TValue,
    public readonly serialize: (value: TValue) => TJson,
    public readonly lerp: (start: TValue, end: TValue, t: number) => TValue,
    public readonly equals: (a: TValue, b: TValue) => boolean,
    public readonly clone: (value: TValue) => TValue
  ) {}
}
