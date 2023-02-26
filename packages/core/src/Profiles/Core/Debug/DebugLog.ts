import {
  makeFlowNodeDefinition,
  NodeCategory
} from '../../../Nodes/NodeDefinitions';
import { ILogger } from '../Abstractions/ILogger';

export const loggerDependencyKey = 'loggger';

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
    const logger = getDependency<ILogger>(loggerDependencyKey);

    const text = read<string>('text');
    switch (read<string>('severity')) {
      case 'verbose':
        logger?.verbose(text);
        break;
      case 'info':
        logger?.info(text);
        break;
      case 'warning':
        logger?.warn(text);
        break;
      case 'error':
        logger?.error(text);
        break;
    }

    commit('flow');
  }
});
