import { Logger } from '../../Diagnostics/Logger';
import { NodeEvaluationEvent } from './NodeEvaluationEvent';
import { NodeEvaluationType } from './NodeEvaluationType';

export function traceToLogger(event: NodeEvaluationEvent) {
  const prefix = `<< ${event.node.typeName}:${event.node.id} >> `;
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
