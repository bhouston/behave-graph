import * as exampleQuaternion from '../../../graphs/scene/logic/Quaternion.json';
import * as exampleVector2 from '../../../graphs/scene/logic/Vector2.json';
import * as exampleVector3 from '../../../graphs/scene/logic/Vector3.json';
import { Logger } from '../../Diagnostics/Logger';
import { Graph } from '../../Graphs/Graph';
import { GraphJSON } from '../../Graphs/IO/GraphJSON';
import { readGraphFromJSON } from '../../Graphs/IO/readGraphFromJSON';
import { validateDirectedAcyclicGraph } from '../../Graphs/Validation/validateDirectedAcyclicGraph';
import { validateLinks } from '../../Graphs/Validation/validateLinks';
import { Registry } from '../../Registry';
import { registerCoreProfile } from '../Core/registerCoreProfile';
import { registerSceneProfile } from './registerSceneProfile';

const registry = new Registry();
registerCoreProfile(registry);
registerSceneProfile(registry);

Logger.onWarn.clear();

const exampleMap: { [key: string]: any } = {
  vector2: exampleVector2,
  vector3: exampleVector3,
  quaternion: exampleQuaternion
};
console.log('exampleMap', exampleMap);

Object.keys(exampleMap).forEach((key) => {
  describe(`${key}.json`, () => {
    console.log('exampleMap[key]', exampleMap[key]);
    const exampleJSON = exampleMap[key] as GraphJSON;
    console.log('exampleJSON', exampleJSON);

    let parsedGraphJson: Graph | undefined;
    // test('glob json graphs', (done) => {
    test('parse json to graph', () => {
      expect(() => {
        parsedGraphJson = readGraphFromJSON(exampleJSON, registry);
        console.log(parsedGraphJson);
      }).not.toThrow();
      // await fs.writeFile('./examples/test.json', JSON.stringify(writeGraphToJSON(graph), null, ' '), { encoding: 'utf-8' });
      if (parsedGraphJson !== undefined) {
        expect(validateLinks(parsedGraphJson)).toHaveLength(0);
        expect(validateDirectedAcyclicGraph(parsedGraphJson)).toHaveLength(0);
      } else {
        expect(parsedGraphJson).toBeDefined();
      }
    });
  });
});
