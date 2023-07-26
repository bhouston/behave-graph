import {
  makeFlowNodeDefinition,
  NodeCategory
} from '../../../Nodes/NodeDefinitions.js';
import { ILogger, LogSeverity } from '../Abstractions/ILogger.js';

export const Log = makeFlowNodeDefinition({
  typeName: 'debug/log',
  category: NodeCategory.Action,
  label: 'Debug Log',
  in: {
    flow: 'flow',
    text: 'string',
    severity: {
      valueType: 'string',
      defaultValue: 'info',
      choices: ['verbose', 'info', 'warning', 'error'],
      label: 'severity'
    }
  },
  out: { flow: 'flow' },
  initialState: undefined,
  triggered: ({ read, commit, graph: { getDependency } }) => {
    const logger = getDependency<ILogger>('ILogger');
    logger?.log(read<LogSeverity>('severity'), read<string>('text'));
    commit('flow');
  }
});
