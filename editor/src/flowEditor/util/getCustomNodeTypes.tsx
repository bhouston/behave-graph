import { IScene, NodeSpecJSON } from '@behavior-graph/framework';
import { NodeTypes } from 'reactflow';
import { Node } from '../components/Node';

const getCustomNodeTypes = (allSpecs: NodeSpecJSON[], scene: IScene) => {
  return allSpecs.reduce((nodes, node) => {
    nodes[node.type] = (props) => (
      <Node spec={node} allSpecs={allSpecs} {...props} getProperties={scene.getProperties} />
    );
    return nodes;
  }, {} as NodeTypes);
};

export default getCustomNodeTypes;
