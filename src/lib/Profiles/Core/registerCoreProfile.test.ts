import { validateNodeRegistry } from '../../Nodes/Validation/validateNodeRegistry.js';
import { Registry } from '../../Registry.js';
import { validateValueRegistry } from '../../Values/Validation/validateValueRegistry.js';
import { registerCoreProfile } from './registerCoreProfile.js';

describe('core profile', () => {
  const registry = new Registry();
  registerCoreProfile(registry);

  test('validate node registry', () => {
    expect(validateNodeRegistry(registry)).toHaveLength(0);
  });
  test('validate value registry', () => {
    expect(validateValueRegistry(registry)).toHaveLength(0);
  });

  const valueTypeNameToExampleValues: { [key: string]: any[] } = {
    boolean: ['true', 'false', true, false],
    string: ['hello'],
    float: [0.9, -0.1, '-999.1', '9e9'],
    integer: [5, -5, '-999', '9223372036854775807'] // mac int64 value
  };

  Object.keys(valueTypeNameToExampleValues).forEach((valueTypeName) => {
    test(`${valueTypeName} serialization/deserialization`, () => {
      const valueType = registry.values.get(valueTypeName);
      const exampleValues: any[] = valueTypeNameToExampleValues[valueTypeName];
      exampleValues.forEach((exampleValue: any) => {
        const deserializedValue = valueType.deserialize(exampleValue);
        const serializedValue = valueType.serialize(deserializedValue);
        const redeserializedValue = valueType.deserialize(serializedValue);
        expect(deserializedValue).toBe(redeserializedValue);
        const reserializedValue = valueType.serialize(redeserializedValue);
        expect(serializedValue).toBe(reserializedValue);
      });
    });
  });
});
