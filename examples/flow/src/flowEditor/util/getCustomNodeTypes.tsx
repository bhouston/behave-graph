import { NodeSpecJSON } from '@behave-graph/core';
import { NodeTypes } from 'reactflow';
import { ISceneWithQueries } from '../../abstractions';
import { Node } from '../components/Node';

const getCustomNodeTypes = (allSpecs: NodeSpecJSON[], scene: ISceneWithQueries) => {
  return allSpecs.reduce((nodes, node) => {
    nodes[node.type] = (props) => (
      <Node spec={node} allSpecs={allSpecs} {...props} getProperties={scene.getProperties} />
    );
    return nodes;
  }, {} as NodeTypes);
};

export default getCustomNodeTypes;
