import { ValueType } from './ValueType';

export class ValueTypeRegistry {
  private readonly valueTypeNameToValueType: { [key: string]: ValueType } = {};

  constructor() {
    // register core types
    this.register(
      new ValueType(
        'string',
        () => '',
        (text: string) => text,
        (value) => value as string
      )
    );
    this.register(
      new ValueType(
        'boolean',
        () => false,
        (text) => text === 'true',
        (value) => ((value as boolean) ? 'true' : 'false')
      )
    );
    this.register(
      new ValueType(
        'float',
        () => 0,
        (text: string | number) => {
          if (typeof text === 'string') {
            return Number.parseFloat(text);
          }

          return text;
        },
        (value) => value
      )
    );
    this.register(
      new ValueType(
        'integer',
        () => 0n,
        (text: string | number): bigint => {
          if (typeof text === 'string') {
            return BigInt(Number.parseFloat(text));
          }

          return BigInt(text);
        },
        (value: bigint) => value.toString()
      )
    );
    this.register(
      new ValueType(
        'id',
        () => '',
        (text: string) => text,
        (value) => value as string
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
}
