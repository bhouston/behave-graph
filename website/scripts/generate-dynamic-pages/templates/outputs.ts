import { INode } from '@behave-graph/core';

import { NodeSpecJSON } from '../../../../packages/core/src/Graphs/IO/NodeSpecJSON';
import socketsTable from './outputs-table';

export default (node: INode, specJSON: NodeSpecJSON) => {
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
