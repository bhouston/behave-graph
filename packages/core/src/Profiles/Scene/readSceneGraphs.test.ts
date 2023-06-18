import * as flashSuzanneJson from '../../../../../apps/three-viewer/public/graphs/scene/actions/FlashSuzanne.json';
import * as hierarchyJson from '../../../../../apps/three-viewer/public/graphs/scene/actions/Hierarchy.json';
import * as spinningSuzanneJson from '../../../../../apps/three-viewer/public/graphs/scene/actions/SpinningSuzanne.json';
import * as colorJson from '../../../../../graphs/scene/logic/Color.json';
import * as eulerJson from '../../../../../graphs/scene/logic/Euler.json';
import * as quaternionJson from '../../../../../graphs/scene/logic/Quaternion.json';
import * as vector2Json from '../../../../../graphs/scene/logic/Vector2.json';
import * as vector3Json from '../../../../../graphs/scene/logic/Vector3.json';
import * as vector4Json from '../../../../../graphs/scene/logic/Vector4.json';
import { Logger } from '../../Diagnostics/Logger';
import { Graph } from '../../Graphs/Graph';
import { GraphJSON } from '../../Graphs/IO/GraphJSON';
import { readGraphFromJSON } from '../../Graphs/IO/readGraphFromJSON';
import { validateGraphAcyclic } from '../../Graphs/Validation/validateGraphAcyclic';
import { validateGraphLinks } from '../../Graphs/Validation/validateGraphLinks';
import { Registry } from '../../Registry';
import { registerCoreProfile } from '../Core/registerCoreProfile';
import { registerSceneProfile } from './registerSceneProfile';

const registry = new Registry();
registerCoreProfile(registry);
registerSceneProfile(registry);

Logger.onWarn.clear();

const exampleMap: { [key: string]: any } = {
  vector2Json,
  vector3Json,
  vector4Json,
  quaternionJson,
  colorJson,
  eulerJson,
  flashSuzanneJson,
  hierarchyJson,
  spinningSuzanneJson
};

for (const key in exampleMap) {
  describe(`${key}`, () => {
    const exampleJson = exampleMap[key] as GraphJSON;

    let parsedGraphJson: Graph | undefined;
    test('parse json to graph', () => {
      expect(() => {
        parsedGraphJson = readGraphFromJSON(exampleJson, registry);
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
}
