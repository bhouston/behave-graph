import { ValueTypeMap } from '../ValueTypeMap.js';

const valueTypeNameRegex = /^\w+$/;

export function validateValueRegistry(values: ValueTypeMap): string[] {
  const errorList: string[] = [];

  Object.keys(values).forEach((valueTypeName) => {
    if (!valueTypeNameRegex.test(valueTypeName)) {
      errorList.push(`invalid value type name ${valueTypeName}`);
    }

    const valueType = values[valueTypeName];

    const value = valueType?.creator();
    const serializedValue = valueType?.serialize(value);
    const deserializedValue = valueType?.deserialize(serializedValue);
    const reserializedValue = valueType?.serialize(deserializedValue);
    const redeserializedValue = valueType?.deserialize(reserializedValue);

    if (JSON.stringify(serializedValue) !== JSON.stringify(reserializedValue)) {
      errorList.push(
        `value type (${valueTypeName}) reserialization mismatch between ${JSON.stringify(
          serializedValue
        )} and ${JSON.stringify(reserializedValue)}`
      );
    }

    if (
      typeof deserializedValue !== 'bigint' &&
      JSON.stringify(deserializedValue) !== JSON.stringify(redeserializedValue)
    ) {
      errorList.push(
        `value type (${valueTypeName}) redeserialization mismatch between ${JSON.stringify(
          deserializedValue
        )} and ${JSON.stringify(redeserializedValue)}`
      );
    }
  });
  return errorList;
}
