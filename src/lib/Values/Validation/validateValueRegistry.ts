import { Registry } from '../../Registry';

export function validateValueRegistry(graphRegistry: Registry): string[] {
  const errorList: string[] = [];

  graphRegistry.values.getAllNames().forEach((valueTypeName) => {
    const valueType = graphRegistry.values.get(valueTypeName);

    const value = valueType.creator();
    const serializedValue = valueType.serialize(value);
    const deserializedValue = valueType.deserialize(serializedValue);
    const reserializedValue = valueType.serialize(deserializedValue);
    if (serializedValue !== reserializedValue) {
      errorList.push(
        `value type (${valueTypeName}) reserialization mismatch between ${serializedValue} and ${reserializedValue}`
      );
    }
  });
  return errorList;
}
