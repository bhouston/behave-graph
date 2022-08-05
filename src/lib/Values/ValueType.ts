export default class ValueType {
  constructor(
    public name: string,
    public creator: () => any,
    public parse: (text: string)=>any,
    public toString: (value: any)=> string,
  ) {
  }
}
