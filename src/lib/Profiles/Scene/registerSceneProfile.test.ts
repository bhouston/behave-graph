import { validateNodeRegistry } from '../../Nodes/Validation/validateNodeRegistry';
import { Registry } from '../../Registry';
import { validateValueRegistry } from '../../Values/Validation/validateValueRegistry';
import { registerCoreProfile } from '../Core/registerCoreProfile';
import { registerSceneProfile } from './registerSceneProfile';

describe('scene profile', () => {
  const registry = new Registry();
  registerCoreProfile(registry);
  registerSceneProfile(registry);

  test('validate node registry', () => {
    expect(validateNodeRegistry(registry)).toHaveLength(0);
  });
  test('validate value registry', () => {
    expect(validateValueRegistry(registry)).toHaveLength(0);
  });
});
