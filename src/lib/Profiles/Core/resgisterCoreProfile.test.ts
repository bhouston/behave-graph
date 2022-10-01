import validateGraphRegistry from '../../Graphs/Validation/validateGraphRegistry';
import Registry from '../../Registry';
import registerCoreProfile from './registerCoreProfile';

describe('core profile', () => {

    const registry = new Registry();
    registerCoreProfile(registry);

    test('validate the registry', () => {
        // await fs.writeFile('./examples/test.json', JSON.stringify(writeGraphToJSON(graph), null, ' '), { encoding: 'utf-8' });
        expect(validateGraphRegistry(registry)).toHaveLength(0);
    });
});