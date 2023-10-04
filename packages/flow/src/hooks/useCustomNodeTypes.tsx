import { useEffect, useState } from 'react';
import { NodeTypes } from 'reactflow';

import { Node } from '../components/Node.js';
import { NodeSpecGenerator } from './useNodeSpecGenerator.js';

const getCustomNodeTypes = (specGenerator: NodeSpecGenerator) => {
  return specGenerator.getNodeTypes().reduce((nodes: NodeTypes, nodeType) => {
    nodes[nodeType] = (props) => {
      let spec = specGenerator.getNodeSpec(nodeType, props.data.configuration);
      return <Node spec={spec} specGenerator={specGenerator} {...props} />;
    };
    return nodes;
  }, {});
};

export const useCustomNodeTypes = ({
  specGenerator
}: {
  specGenerator: NodeSpecGenerator | undefined;
}) => {
  const [customNodeTypes, setCustomNodeTypes] = useState<NodeTypes>();
  useEffect(() => {
    if (!specGenerator) return;
    const customNodeTypes = getCustomNodeTypes(specGenerator);

    setCustomNodeTypes(customNodeTypes);
  }, [specGenerator]);

  return customNodeTypes;
};
