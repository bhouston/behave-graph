import { Registry } from '../../Registry';

export function validateValueRegistry(graphRegistry: Registry): string[] {
  const errorList: string[] = [];

  graphRegistry.values.getAllNames().forEach((valueTypeName) => {
    const valueType = graphRegistry.values.get(valueTypeName);

    const value = valueType.creator();
    const deserializedValue = valueType.deserialize(value);
    const reserializedValue = valueType.serialize(deserializedValue);
    const redeserializedValue = valueType.deserialize(reserializedValue);
    if (deserializedValue !== redeserializedValue) {
      errorList.push(
        `value type (${valueTypeName}) reserialization mismatch between ${deserializedValue} and ${redeserializedValue}`
      );
    }
  });
  return errorList;
}
