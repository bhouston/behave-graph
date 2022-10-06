import exampleDelay from '../../../graphs/core/async/Delay.json';
import exampleCustomEvent from '../../../graphs/core/events/CustomEvents.json';
import exampleLifecycle from '../../../graphs/core/events/Lifecycle.json';
import exampleBranch from '../../../graphs/core/flow/Branch.json';
import exampleFlipFlop from '../../../graphs/core/flow/FlipFlop.json';
import exampleForLoop from '../../../graphs/core/flow/ForLoop.json';
import exampleSequence from '../../../graphs/core/flow/Sequence.json';
import exampleHelloWorld from '../../../graphs/core/HelloWorld.json';
import exampleMath from '../../../graphs/core/logic/Math.json';
import exampleChanged from '../../../graphs/core/variables/Changed.json';
import exampleFrameCounter from '../../../graphs/core/variables/FrameCounter.json';
import exampleInitialValue from '../../../graphs/core/variables/InitialValue.json';
import exampleSetGet from '../../../graphs/core/variables/SetGet.json';
import { Logger } from '../../Diagnostics/Logger';
import { registerCoreProfile } from '../../Profiles/Core/registerCoreProfile';
import { Registry } from '../../Registry';
import { Graph } from '../Graph';
import { validateDirectedAcyclicGraph } from '../Validation/validateDirectedAcyclicGraph';
import { validateLinks } from '../Validation/validateLinks';
import { GraphJSON } from './GraphJSON';
import { readGraphFromJSON } from './readGraphFromJSON';

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
  math: exampleMath,
  customEvent: exampleCustomEvent,
  lifeCycle: exampleLifecycle,
  changed: exampleChanged,
  frameCounter: exampleFrameCounter,
  initialValue: exampleInitialValue
};

Object.keys(exampleMap).forEach((key) => {
  describe(`${key}.json`, () => {
    const exampleJSON = exampleMap[key] as GraphJSON;

    let parsedGraphJson: Graph | undefined;
    // test('glob json graphs', (done) => {
    test('parse json to graph', () => {
      expect(() => {
        parsedGraphJson = readGraphFromJSON(exampleJSON, registry);
      }).not.toThrow();
    });
    test('validate graph', () => {
      // await fs.writeFile('./examples/test.json', JSON.stringify(writeGraphToJSON(graph), null, ' '), { encoding: 'utf-8' });
      if (parsedGraphJson !== undefined) {
        expect(validateLinks(parsedGraphJson)).toHaveLength(0);
        Logger.verbose('validating that graph is directed acyclic');
        expect(validateDirectedAcyclicGraph(parsedGraphJson)).toHaveLength(0);
      }
    });
  });
});
