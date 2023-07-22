import { Logger } from '../../Diagnostics/Logger.js';
import { ManualLifecycleEventEmitter } from '../../Profiles/Core/Abstractions/Drivers/ManualLifecycleEventEmitter.js';
import { registerCoreProfile } from '../../Profiles/Core/registerCoreProfile.js';
import { readGraphFromJSON } from './readGraphFromJSON.js';
Logger.onWarn.clear();

describe('readGraphFromJSON', () => {
  const registry = registerCoreProfile({
    values: {},
    nodes: {},
    dependencies: {
      ILogger: new Logger(),
      ILifecycleEventEmitter: new ManualLifecycleEventEmitter()
    }
  });

  it('throws if node ids are not unique', () => {
    const json = {
      variables: [],
      customEvents: [],
      nodes: [
        {
          type: 'lifecycle/onStart',
          id: '0'
        },
        {
          type: 'debug/log',
          id: '0'
        }
      ]
    };
    expect(() => readGraphFromJSON({ graphJson: json, registry })).toThrow();
  });

  it("throws if input keys don't match known sockets", () => {
    const json = {
      variables: [],
      customEvents: [],
      nodes: [
        {
          type: 'debug/log',
          id: '1',
          parameters: {
            wrong: { value: 'Hello World!' }
          }
        }
      ]
    };
    expect(() => readGraphFromJSON({ graphJson: json, registry })).toThrow();
  });

  it('throws if input points to non-existent node', () => {
    const json = {
      variables: [],
      customEvents: [],
      nodes: [
        {
          type: 'lifecycle/onStart',
          id: '0'
        },
        {
          type: 'debug/log',
          id: '1',
          parameters: {
            text: { value: 'Hello World!' }
          },
          flows: {
            flow: { nodeId: '2', socket: 'flow' }
          }
        }
      ]
    };
    expect(() => readGraphFromJSON({ graphJson: json, registry })).toThrow();
  });

  it('throws if input points to non-existent socket', () => {
    const json = {
      variables: [],
      customEvents: [],
      nodes: [
        {
          type: 'lifecycle/onStart',
          id: '0'
        },
        {
          type: 'debug/log',
          id: '1',
          parameters: {
            text: { value: 'Hello World!' }
          },
          flows: {
            flow: { nodeId: '0', socket: 'text' }
          }
        }
      ]
    };
    expect(() => readGraphFromJSON({ graphJson: json, registry })).toThrow();
  });
});
