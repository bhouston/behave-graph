import * as customEventJson from '../../../../../graphs/core/events/CustomEvents.json';
import * as lifecycleJson from '../../../../../graphs/core/events/Lifecycle.json';
import * as branchJson from '../../../../../graphs/core/flow/Branch.json';
import * as flipFlopJson from '../../../../../graphs/core/flow/FlipFlop.json';
import * as forLoopJson from '../../../../../graphs/core/flow/ForLoop.json';
import * as performanceTestJson from '../../../../../graphs/core/flow/PerformanceTest.json';
import * as sequenceJson from '../../../../../graphs/core/flow/Sequence.json';
import * as helloWorldJson from '../../../../../graphs/core/HelloWorld.json';
import * as polynomialJson from '../../../../../graphs/core/logic/Polynomial.json';
import * as delayJson from '../../../../../graphs/core/time/Delay.json';
import * as frameCounterJson from '../../../../../graphs/core/variables/FrameCounter.json';
import * as initialValueJson from '../../../../../graphs/core/variables/InitialValue.json';
import * as setGetJson from '../../../../../graphs/core/variables/SetGet.json';
import { Logger } from '../../Diagnostics/Logger.js';
import { GraphInstance } from '../../Graphs/Graph.js';
import { GraphJSON } from '../../Graphs/IO/GraphJSON.js';
import { readGraphFromJSON } from '../../Graphs/IO/readGraphFromJSON.js';
import { validateGraphAcyclic } from '../../Graphs/Validation/validateGraphAcyclic.js';
import { validateGraphLinks } from '../../Graphs/Validation/validateGraphLinks.js';
import {
  getCoreNodeDefinitions,
  getCoreValueMap
} from './registerCoreProfile.js';

const valueTypes = getCoreValueMap();
const nodeDefinitions = getCoreNodeDefinitions(valueTypes);

Logger.onWarn.clear();

const exampleMap: { [key: string]: any } = {
  branchJson,
  delayJson,
  flipFlopJson,
  forLoopJson,
  sequenceJson,
  helloWorldJson,
  setGetJson,
  polynomialJson,
  customEventJson,
  lifecycleJson,
  frameCounterJson,
  initialValueJson,
  performanceTestJson
};

for (const key in exampleMap) {
  describe(`${key}`, () => {
    const exampleJson = exampleMap[key] as GraphJSON;

    let parsedGraphJson: GraphInstance | undefined;
    test('parse json to graph', () => {
      expect(() => {
        parsedGraphJson = readGraphFromJSON({
          graphJson: exampleJson,
          nodes: nodeDefinitions,
          values: valueTypes,
          dependencies: {}
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
  });
}
