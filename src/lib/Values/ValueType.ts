export class ValueType<TValue = any> {
  constructor(
    public readonly name: string,
    public readonly creator: () => TValue,
    public readonly deserialize: (text: string) => TValue,
    public readonly serialize: (value: TValue) => string
  ) {}
}
