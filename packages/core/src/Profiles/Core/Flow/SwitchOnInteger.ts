import {
  makeFlowNodeDefinition,
  SocketsList
} from '../../../Nodes/NodeDefinitions';
import { sequence } from '../../../sequence';

// https://docs.unrealengine.com/4.27/en-US/ProgrammingAndScripting/Blueprints/UserGuide/flow/

export const SwitchOnInteger = makeFlowNodeDefinition({
  typeName: 'flow/switch/integer',
  label: 'Switch on Int',
  configuration: {
    numCases: {
      valueType: 'number'
    }
  },
  in: (configuration) => {
    const sockets: SocketsList = [];

    sockets.push(
      { key: 'flow', valueType: 'flow' },
      { key: 'selection', valueType: 'integer' }
    );

    for (const index of sequence(1, configuration.numCases + 1)) {
      sockets.push({ key: `${index}`, valueType: 'integer' });
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
    const selection = read<bigint>('selection');
    for (const index of sequence(1, configuration.numCases + 1)) {
      if (selection === read<bigint>(`${index}`)) {
        commit(`${index}`);
        return;
      }
    }
    commit('default');
  }
});
