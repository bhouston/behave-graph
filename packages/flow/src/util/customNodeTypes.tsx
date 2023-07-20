import React from 'react';
import { NodeTypes } from 'reactflow';

import { Node } from '../components/Node.js';
import { getNodeSpecJSON } from './getNodeSpecJSON.js';

const spec = getNodeSpecJSON();

export const customNodeTypes = spec.reduce((nodes, node) => {
  nodes[node.type] = (props) => <Node spec={node} allSpecs={spec} {...props} />;
  return nodes;
}, {} as NodeTypes);
