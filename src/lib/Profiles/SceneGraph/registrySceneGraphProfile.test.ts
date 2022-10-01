import validateGraphRegistry from '../../Graphs/Validation/validateGraphRegistry';
import Registry from '../../Registry';
import registerCoreProfile from '../Core/registerCoreProfile';
import registerSceneGraphProfile from './registerSceneGraphProfile';

describe('scene graph profile', () => {

    const registry = new Registry();
    registerCoreProfile(registry);
    registerSceneGraphProfile(registry);

    test('validate the registry', () => {
        // await fs.writeFile('./examples/test.json', JSON.stringify(writeGraphToJSON(graph), null, ' '), { encoding: 'utf-8' });
        expect(validateGraphRegistry(registry)).toHaveLength(0);
    });
});