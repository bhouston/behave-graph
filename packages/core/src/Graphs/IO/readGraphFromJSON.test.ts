import { Logger } from '../../Diagnostics/Logger';
import { getCoreRegistry } from '../../Profiles/Core/registerCoreProfile';
import { readGraphFromJSON } from './readGraphFromJSON';

Logger.onWarn.clear();

describe('readGraphFromJSON', () => {
  const registry = getCoreRegistry();
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
    expect(() =>
      readGraphFromJSON({ graphJson: json, ...registry, dependencies: {} })
    ).toThrow();
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
    expect(() =>
      readGraphFromJSON({ graphJson: json, ...registry, dependencies: {} })
    ).toThrow();
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
    expect(() =>
      readGraphFromJSON({ graphJson: json, ...registry, dependencies: {} })
    ).toThrow();
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
    expect(() =>
      readGraphFromJSON({ graphJson: json, ...registry, dependencies: {} })
    ).toThrow();
  });
});
