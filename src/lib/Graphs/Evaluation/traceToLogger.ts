import { Logger } from '../../Diagnostics/Logger.js';
import { NodeEvaluationEvent } from './NodeEvaluationEvent.js';
import { NodeEvaluationType } from './NodeEvaluationType.js';

export function traceToLogger(event: NodeEvaluationEvent) {
  const prefix = `<< ${event.node.description.typeName}:${event.node.id} >> `;
  if (event.nodeEvaluationType === NodeEvaluationType.None) {
    Logger.info(prefix + ` Eval Done`);
  } else {
    Logger.info(
      prefix +
        ` Eval Start (mode: ${
          NodeEvaluationType[event.nodeEvaluationType]
        }, async: ${event.async})`
    );
  }
}
