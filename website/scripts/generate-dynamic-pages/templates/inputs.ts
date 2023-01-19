import { INode } from '@behave-graph/core';

import { NodeSpecJSON } from '../../../../packages/core/src/Graphs/IO/NodeSpecJSON';
import socketsTable from './inputs-table';

export default (node: INode, specJSON: NodeSpecJSON) => {
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
