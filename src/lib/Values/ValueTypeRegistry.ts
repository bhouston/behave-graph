import ValueType from './ValueType';

export default class ValueTypeRegistry {
  public valueTypeNameToValueType = new Map<string, ValueType>();

  constructor() {
    // register core types
    this.register(new ValueType('string', () => '', (text) => text, (value) => (value as string)));
    this.register(new ValueType('boolean', () => false, (text) => (text === 'true'), (value) => ((value as boolean) ? 'true' : 'false')));
    this.register(new ValueType('number', () => 0, (text) => parseFloat(text), (value) => `${(value as number)}`));
  }

  register(valueType: ValueType) {
    if (this.valueTypeNameToValueType.get(valueType.name) !== undefined) {
      throw new Error(`already registered value type ${valueType.name}`);
    }
    this.valueTypeNameToValueType.set(valueType.name, valueType);
  }

  get(valueTypeName: string): ValueType {
    const valueType = this.valueTypeNameToValueType.get(valueTypeName);
    if (valueType === undefined) {
      throw new Error(`can not find value type with name '${valueTypeName}`);
    }
    return valueType;
  }
}
