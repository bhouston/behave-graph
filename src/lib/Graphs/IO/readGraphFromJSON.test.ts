import exampleDelay from '../../../../examples/async/Delay.json';
import exampleBranch from '../../../../examples/basics/Branch.json';
import exampleHelloWorld from '../../../../examples/basics/HelloWorld.json';
import exampleMath from '../../../../examples/basics/Math.json';
import exampleFlipFlop from '../../../../examples/flow/FlipFlop.json';
import exampleForLoop from '../../../../examples/flow/ForLoop.json';
import exampleSequence from '../../../../examples/flow/Sequence.json';
import exampleState from '../../../../examples/variables/SetGet.json';
import Logger from '../../Diagnostics/Logger';
import { registerGenericNodes } from '../../index';
import Registry from '../../Registry';
import { GraphJSON } from './GraphJSON';
import readGraphFromJSON from './readGraphFromJSON';

const registry = new Registry();
registerGenericNodes(registry.nodes);

Logger.onWarn.clear();

describe('readGraphFromJSON', () => {
  it('throws if node ids are not unique', () => {
    const json = {
      variables: [],
      nodes: [
        {
          type: 'event/start',
          id: '0',
        },
        {
          type: 'action/log',
          id: '0',
        },
      ],
    };
    expect(() => readGraphFromJSON(json, registry)).toThrow();
  });

  it('throws if input keys don\'t match known sockets', () => {
    const json = {
      variables: [],
      nodes: [
        {
          type: 'action/log',
          id: '1',
          inputs: {
            wrong: { value: 'Hello World!' },
          },
        },
      ],
    };
    expect(() => readGraphFromJSON(json, registry)).toThrow();
  });

  it('throws if input points to non-existent node', () => {
    const json = {
      variables: [],
      nodes: [
        {
          type: 'event/start',
          id: '0',
        },
        {
          type: 'action/log',
          id: '1',
          inputs: {
            flow: { links: [{ nodeId: '2', socket: 'flow' }] },
            text: { value: 'Hello World!' },
          },
        },
      ],
    };
    expect(() => readGraphFromJSON(json, registry)).toThrow();
  });

  it('throws if input points to non-existent socket', () => {
    const json = {
      variables: [],
      nodes: [
        {
          type: 'event/start',
          id: '0',
        },
        {
          type: 'action/log',
          id: '1',
          inputs: {
            flow: { links: [{ nodeId: '0', socket: 'text' }] },
            text: { value: 'Hello World!' },
          },
        },
      ],
    };
    expect(() => readGraphFromJSON(json, registry)).toThrow();
  });

  it('parses all the examples without error', () => {
    const examples = [exampleBranch, exampleDelay, exampleHelloWorld, exampleMath,
      exampleState, exampleForLoop, exampleSequence, exampleFlipFlop] as GraphJSON[];

    examples.forEach((json) => {
      expect(() => readGraphFromJSON(json, registry)).not.toThrow();
    });
  });
});
