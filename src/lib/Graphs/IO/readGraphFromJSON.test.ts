import { Logger } from '../../Diagnostics/Logger.js';
import { registerCoreProfile } from '../../Profiles/Core/registerCoreProfile.js';
import { Registry } from '../../Registry.js';
import { readGraphFromJSON } from './readGraphFromJSON.js';

const registry = new Registry();
registerCoreProfile(registry);

Logger.onWarn.clear();

describe('readGraphFromJSON', () => {
  it('throws if node ids are not unique', () => {
    const json = {
      variables: [],
      customEvents: [],
      nodes: [
        {
          type: 'lifecycle/start',
          id: '0'
        },
        {
          type: 'action/log',
          id: '0'
        }
      ]
    };
    expect(() => readGraphFromJSON(json, registry)).toThrow();
  });

  it("throws if input keys don't match known sockets", () => {
    const json = {
      variables: [],
      customEvents: [],
      nodes: [
        {
          type: 'action/log',
          id: '1',
          inputs: {
            wrong: { value: 'Hello World!' }
          }
        }
      ]
    };
    expect(() => readGraphFromJSON(json, registry)).toThrow();
  });

  it('throws if input points to non-existent node', () => {
    const json = {
      variables: [],
      customEvents: [],
      nodes: [
        {
          type: 'lifecycle/start',
          id: '0'
        },
        {
          type: 'action/log',
          id: '1',
          inputs: {
            flow: { links: [{ nodeId: '2', socket: 'flow' }] },
            text: { value: 'Hello World!' }
          }
        }
      ]
    };
    expect(() => readGraphFromJSON(json, registry)).toThrow();
  });

  it('throws if input points to non-existent socket', () => {
    const json = {
      variables: [],
      customEvents: [],
      nodes: [
        {
          type: 'lifecycle/start',
          id: '0'
        },
        {
          type: 'action/log',
          id: '1',
          inputs: {
            flow: { links: [{ nodeId: '0', socket: 'text' }] },
            text: { value: 'Hello World!' }
          }
        }
      ]
    };
    expect(() => readGraphFromJSON(json, registry)).toThrow();
  });
});
