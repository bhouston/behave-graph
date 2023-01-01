import { NodeSpecJSON } from '../../../../packages/core/src/Graphs/IO/NodeSpecJSON';
import { Node } from '../../../../packages/core/src/Nodes/Node';
import socketsTable from './outputs-table';

export default (node: Node, specJSON: NodeSpecJSON) => {
  if (
    !('outputs' in node) ||
    !Array.isArray(node.outputs) ||
    node.outputs.length === 0
  ) {
    return '';
  }

  return `## Outputs

${socketsTable(node.outputs)}`;
};
