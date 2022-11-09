import { ValueType } from './ValueType.js';

export class ValueTypeRegistry {
  private readonly valueTypeNameToValueType: { [key: string]: ValueType } = {};

  register(...valueTypes: Array<ValueType>) {
    valueTypes.forEach((valueType) => {
      if (valueType.name in this.valueTypeNameToValueType) {
        throw new Error(`already registered value type ${valueType.name}`);
      }
      this.valueTypeNameToValueType[valueType.name] = valueType;
    });
  }

  get(valueTypeName: string): ValueType {
    if (!(valueTypeName in this.valueTypeNameToValueType)) {
      throw new Error(`can not find value type with name '${valueTypeName}`);
    }
    return this.valueTypeNameToValueType[valueTypeName];
  }

  getAllNames(): string[] {
    return Object.keys(this.valueTypeNameToValueType);
  }
}
