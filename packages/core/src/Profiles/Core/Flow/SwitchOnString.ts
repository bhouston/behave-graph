import {
  makeFlowNodeDefinition,
  SocketsList
} from '../../../Nodes/NodeDefinitions.js';
import { sequence } from '../../../sequence.js';

// https://docs.unrealengine.com/4.27/en-US/ProgrammingAndScripting/Blueprints/UserGuide/flow/

export const SwitchOnString = makeFlowNodeDefinition({
  typeName: 'flow/switch/string',
  label: 'Switch on String',
  configuration: {
    numCases: {
      valueType: 'number'
    }
  },
  in: (configuration) => {
    const sockets: SocketsList = [];

    sockets.push(
      { key: 'flow', valueType: 'flow' },
      { key: 'selection', valueType: 'string' }
    );

    for (const index of sequence(1, configuration.numCases + 1)) {
      sockets.push({ key: `${index}`, valueType: 'string' });
    }

    return sockets;
  },
  out: (configuration) => {
    const sockets: SocketsList = [];

    sockets.push({ key: 'default', valueType: 'flow' });
    for (const index of sequence(1, configuration.numCases + 1)) {
      sockets.push({ key: `${index}`, valueType: 'flow' });
    }

    return sockets;
  },
  initialState: undefined,
  triggered: ({ read, commit, configuration }) => {
    const selection = read<string>('selection');
    for (const index of sequence(1, configuration.numCases + 1)) {
      if (selection === read<string>(`${index}`)) {
        commit(`${index}`);
        return;
      }
    }
    commit('default');
  }
});
