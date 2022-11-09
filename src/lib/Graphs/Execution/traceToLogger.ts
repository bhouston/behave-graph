import { Logger } from '../../Diagnostics/Logger.js';
import { Node } from '../../Nodes/Node.js';
export function traceToLogger(node: Node) {
  const prefix = `<< ${node.description.typeName}:${node.id} >> `;
  Logger.verbose(prefix);
}
