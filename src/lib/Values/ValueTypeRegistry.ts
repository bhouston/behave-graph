import { parseSafeFloat } from '../parseFloats';
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
        (value: string | boolean) =>
          typeof value === 'string' ? value.toLowerCase() === 'true' : value,
        (value: boolean) => value
      )
    );
    this.register(
      new ValueType(
        'float',
        () => 0,
        (value: string | number) =>
          typeof value === 'string' ? parseSafeFloat(value, 0) : value,
        (value: number) => value
      )
    );
    this.register(
      new ValueType(
        'integer',
        () => 0n,
        (value: string | number): bigint => BigInt(value),
        (value: bigint) =>
          Number.MIN_SAFE_INTEGER <= value && value <= Number.MAX_SAFE_INTEGER
            ? Number(value)
            : value.toString() // prefer string to ensure full range is covered
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
