import { Registry } from '../../Registry';

export function validateValueRegistry(graphRegistry: Registry): string[] {
  const errorList: string[] = [];

  graphRegistry.values.getAllNames().forEach((valueTypeName) => {
    const valueType = graphRegistry.values.get(valueTypeName);

    const value = valueType.creator();
    const serializedValue = valueType.serialize(value);
    const deserializedValue = valueType.deserialize(serializedValue);
    const reserializedValue = valueType.serialize(deserializedValue);
    const redeserializedValue = valueType.deserialize(reserializedValue);

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
