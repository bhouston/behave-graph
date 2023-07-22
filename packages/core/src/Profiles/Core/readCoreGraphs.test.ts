import fs from 'fs';
import path from 'path';

import { Logger } from '../../Diagnostics/Logger.js';
import { GraphInstance } from '../../Graphs/Graph.js';
import { GraphJSON } from '../../Graphs/IO/GraphJSON.js';
import { readGraphFromJSON } from '../../Graphs/IO/readGraphFromJSON.js';
import { validateGraphAcyclic } from '../../Graphs/Validation/validateGraphAcyclic.js';
import { validateGraphLinks } from '../../Graphs/Validation/validateGraphLinks.js';
import { memo } from '../../memo.js';
import { getCoreNodesMap, getCoreValuesMap } from './registerCoreProfile.js';

const valueTypes = getCoreValuesMap();
const nodeDefinitions = getCoreNodesMap();

Logger.onWarn.clear();

const exampleMap = memo<Record<string, GraphJSON>>(() => {
  const result = {} as Record<string, GraphJSON>;
  // read all *.jsons in the folder '../../graphs/core':
  const dir = path.join(__dirname, '../../../../../graphs/core');
  const files = fs.readdirSync(dir);
  for (const file of files) {
    if (file.endsWith('.json')) {
      // get filename
      const filename = path.parse(file).name;
      // read the file as a string and then parse it as JSON
      const data = fs.readFileSync(path.join(dir, file), {
        encoding: 'utf-8'
      });
      const json = JSON.parse(data);
      // add the parsed JSON to the map
      result[filename] = json;
    }
  }
  return result;
})();

describe(`json core graphs`, () => {
  for (const key in exampleMap) {
    const exampleJson = exampleMap[key];

    let parsedGraphJson: GraphInstance | undefined;
    test(`${key}`, () => {
      expect(() => {
        parsedGraphJson = readGraphFromJSON({
          graphJson: exampleJson,
          registry: {
            nodes: nodeDefinitions,
            values: valueTypes,
            dependencies: {}
          }
        });
      }).not.toThrow();
      // await fs.writeFile('./examples/test.json', JSON.stringify(writeGraphToJSON(graph), null, ' '), { encoding: 'utf-8' });
      if (parsedGraphJson !== undefined) {
        expect(validateGraphLinks(parsedGraphJson.nodes)).toHaveLength(0);
        expect(validateGraphAcyclic(parsedGraphJson.nodes)).toHaveLength(0);
      } else {
        expect(parsedGraphJson).toBeDefined();
      }
    });
  }
});
