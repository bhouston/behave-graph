export default class ValueType<TValue = any, TJson = any> {
  constructor(
    public name: string,
    public creator: () => TValue,
    public deserialize: (text: TJson) => TValue,
    public serialize: (value: TValue) => TJson,
  ) {
  }
}
