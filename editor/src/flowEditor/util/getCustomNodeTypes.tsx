import { NodeSpecJSON } from '@behavior-graph/framework';
import { NodeTypes } from 'reactflow';
import { Node } from '../components/Node';

const getCustomNodeTypes = (allSpecs: NodeSpecJSON[]) => {
  return allSpecs.reduce((nodes, node) => {
    nodes[node.type] = (props) => <Node spec={node} allSpecs={allSpecs} {...props} />;
    return nodes;
  }, {} as NodeTypes);
};

export default getCustomNodeTypes;
