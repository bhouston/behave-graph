export default class ValueType<TValue = any, TJson = any> {
  constructor(
    public readonly name: string,
    public readonly creator: () => TValue,
    public readonly deserialize: (text: TJson) => TValue,
    public readonly serialize: (value: TValue) => TJson,
  ) {
  }
}
