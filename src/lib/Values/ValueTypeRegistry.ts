import { ValueType } from './ValueType';

export class ValueTypeRegistry {
  private readonly valueTypeNameToValueType: { [key: string]: ValueType } = {};

  constructor() {
    // register core types
    this.register(
      new ValueType(
        'string',
        () => '',
        (value: string) => value,
        (value: string) => value
      )
    );
    this.register(
      new ValueType(
        'boolean',
        () => false,
        (value: string) => value.toLowerCase() === 'true',
        (value: boolean) => ((value as boolean) ? 'true' : 'false')
      )
    );
    this.register(
      new ValueType(
        'float',
        () => 0,
        (value: string) => Number.parseFloat(value),
        (value: number) => value.toString()
      )
    );
    this.register(
      new ValueType(
        'integer',
        () => 0n,
        (value: string): bigint => BigInt(value),
        (value: bigint) => value.toString()
      )
    );
    this.register(
      new ValueType(
        'id',
        () => '',
        (value: string) => value,
        (value: string) => value
      )
    );
  }

  register(valueType: ValueType) {
    if (this.valueTypeNameToValueType[valueType.name] !== undefined) {
      throw new Error(`already registered value type ${valueType.name}`);
    }
    this.valueTypeNameToValueType[valueType.name] = valueType;
  }

  get(valueTypeName: string): ValueType {
    const valueType = this.valueTypeNameToValueType[valueTypeName];
    if (valueType === undefined) {
      throw new Error(`can not find value type with name '${valueTypeName}`);
    }
    return valueType;
  }

  getAllNames(): string[] {
    return Object.keys(this.valueTypeNameToValueType);
  }
}
