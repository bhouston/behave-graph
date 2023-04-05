// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface ValueType<TValue = any, TJson = any> {
  name: string;
  creator: () => TValue;
  deserialize: (value: TJson) => TValue;
  serialize: (value: TValue) => TJson;
  lerp: (start: TValue, end: TValue, t: number) => TValue;
  equals: (a: TValue, b: TValue) => boolean;
  clone: (value: TValue) => TValue;
}
