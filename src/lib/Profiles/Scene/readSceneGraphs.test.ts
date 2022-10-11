import * as flashSuzanneJson from '../../../graphs/scene/actions/FlashSuzanne.json';
import * as hierarchyJson from '../../../graphs/scene/actions/Hierarchy.json';
import * as spinningSuzanneJson from '../../../graphs/scene/actions/SpinningSuzanne.json';
import * as quaternionJson from '../../../graphs/scene/logic/Quaternion.json';
import * as vector2Json from '../../../graphs/scene/logic/Vector2.json';
import * as vector3Json from '../../../graphs/scene/logic/Vector3.json';
import { Logger } from '../../Diagnostics/Logger.js';
import { Graph } from '../../Graphs/Graph.js';
import { GraphJSON } from '../../Graphs/IO/GraphJSON.js';
import { readGraphFromJSON } from '../../Graphs/IO/readGraphFromJSON.js';
import { validateGraphAcyclic } from '../../Graphs/Validation/validateGraphAcyclic.js';
import { validateGraphLinks } from '../../Graphs/Validation/validateGraphLinks.js';
import { Registry } from '../../Registry.js';
import { registerCoreProfile } from '../Core/registerCoreProfile.js';
import { registerSceneProfile } from './registerSceneProfile.js';

const registry = new Registry();
registerCoreProfile(registry);
registerSceneProfile(registry);

Logger.onWarn.clear();

const exampleMap: { [key: string]: any } = {
  vector2Json,
  vector3Json,
  quaternionJson,
  flashSuzanneJson,
  hierarchyJson,
  spinningSuzanneJson
};
//console.log('exampleMap', exampleMap);

Object.keys(exampleMap).forEach((key) => {
  describe(`${key}`, () => {
    //console.log('exampleMap[key]', exampleMap[key]);
    const exampleJson = exampleMap[key] as GraphJSON;
    //console.log('exampleJSON', exampleJSON);

    let parsedGraphJson: Graph | undefined;
    // test('glob json graphs', (done) => {
    test('parse json to graph', () => {
      expect(() => {
        parsedGraphJson = readGraphFromJSON(exampleJson, registry);
        //console.log(parsedGraphJson);
      }).not.toThrow();
      // await fs.writeFile('./examples/test.json', JSON.stringify(writeGraphToJSON(graph), null, ' '), { encoding: 'utf-8' });
      if (parsedGraphJson !== undefined) {
        expect(validateGraphLinks(parsedGraphJson)).toHaveLength(0);
        expect(validateGraphAcyclic(parsedGraphJson)).toHaveLength(0);
      } else {
        expect(parsedGraphJson).toBeDefined();
      }
    });
  });
});
