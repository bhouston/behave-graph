import { Logger } from '../Diagnostics/Logger';
import { Node } from '../Nodes/Node';
export function traceToLogger(node: Node) {
  const prefix = `<< ${node.description.typeName}:${node.id} >> `;
  Logger.verbose(prefix);
}
