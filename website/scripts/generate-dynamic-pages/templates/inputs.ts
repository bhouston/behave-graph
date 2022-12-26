import { NodeSpecJSON } from '../../../../packages/core/src/Graphs/IO/NodeSpecJSON';
import { Node } from '../../../../packages/core/src/Nodes/Node';
import socketsTable from './inputs-table';

export default (node: Node, specJSON: NodeSpecJSON) => {
  if (
    !('inputs' in node) ||
    !Array.isArray(node.inputs) ||
    node.inputs.length === 0
  ) {
    return '';
  }

  return `## Inputs

${socketsTable(node.inputs, specJSON)}`;
};
