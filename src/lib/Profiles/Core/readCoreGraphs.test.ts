import * as exampleDelay from '../../../graphs/core/async/Delay.json';
import * as exampleCustomEvent from '../../../graphs/core/events/CustomEvents.json';
import * as exampleLifecycle from '../../../graphs/core/events/Lifecycle.json';
import * as exampleBranch from '../../../graphs/core/flow/Branch.json';
import * as exampleFlipFlop from '../../../graphs/core/flow/FlipFlop.json';
import * as exampleForLoop from '../../../graphs/core/flow/ForLoop.json';
import * as examplePerformanceTest from '../../../graphs/core/flow/PerformanceTest.json';
import * as exampleSequence from '../../../graphs/core/flow/Sequence.json';
import * as exampleHelloWorld from '../../../graphs/core/HelloWorld.json';
import * as examplePolynomial from '../../../graphs/core/logic/Polynomial.json';
import * as exampleChanged from '../../../graphs/core/variables/Changed.json';
import * as exampleFrameCounter from '../../../graphs/core/variables/FrameCounter.json';
import * as exampleInitialValue from '../../../graphs/core/variables/InitialValue.json';
import * as exampleSetGet from '../../../graphs/core/variables/SetGet.json';
import { Logger } from '../../Diagnostics/Logger';
import { Graph } from '../../Graphs/Graph';
import { GraphJSON } from '../../Graphs/IO/GraphJSON';
import { readGraphFromJSON } from '../../Graphs/IO/readGraphFromJSON';
import { validateGraphAcyclic } from '../../Graphs/Validation/validateGraphAcyclic';
import { validateGraphLinks } from '../../Graphs/Validation/validateGraphLinks';
import { Registry } from '../../Registry';
import { registerCoreProfile } from './registerCoreProfile';

const registry = new Registry();
registerCoreProfile(registry);

Logger.onWarn.clear();

const exampleMap: { [key: string]: any } = {
  delay: exampleDelay,
  branch: exampleBranch,
  flipFlip: exampleFlipFlop,
  forLoop: exampleForLoop,
  sequence: exampleSequence,
  helloWorld: exampleHelloWorld,
  setGet: exampleSetGet,
  math: examplePolynomial,
  customEvent: exampleCustomEvent,
  lifeCycle: exampleLifecycle,
  changed: exampleChanged,
  frameCounter: exampleFrameCounter,
  initialValue: exampleInitialValue,
  performanceTest: examplePerformanceTest
};

//console.log('exampleMap', exampleMap);

Object.keys(exampleMap).forEach((key) => {
  describe(`${key}.json`, () => {
    //console.log('exampleMap[key]', exampleMap[key]);
    const exampleJSON = exampleMap[key] as GraphJSON;
    //console.log('exampleJSON', exampleJSON);

    let parsedGraphJson: Graph | undefined;
    // test('glob json graphs', (done) => {
    test('parse json to graph', () => {
      expect(() => {
        parsedGraphJson = readGraphFromJSON(exampleJSON, registry);
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
