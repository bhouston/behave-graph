import { NodeSpecJSON } from '@behave-graph/core';
import React from 'react';
import { NodeProps as FlowNodeProps, useEdges } from 'reactflow';

import { useChangeNodeData } from '../hooks/useChangeNodeData.js';
import { useAddNodeSocket } from '../hooks/useAddNodeSocket.js';
import { NodeSpecGenerator } from '../hooks/useNodeSpecGenerator.js';
import { isHandleConnected } from '../util/isHandleConnected.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons';

import InputSocket from './InputSocket.js';
import NodeContainer from './NodeContainer.js';
import OutputSocket from './OutputSocket.js';

type NodeProps = FlowNodeProps & {
  spec: NodeSpecJSON;
  specGenerator: NodeSpecGenerator;
};

const getPairs = <T, U>(arr1: T[], arr2: U[]) => {
  const max = Math.max(arr1.length, arr2.length);
  const pairs = [];
  for (let i = 0; i < max; i++) {
    const pair: [T | undefined, U | undefined] = [arr1[i], arr2[i]];
    pairs.push(pair);
  }
  return pairs;
};

export const Node: React.FC<NodeProps> = ({
  id,
  data,
  spec,
  selected,
  specGenerator,
}: NodeProps) => {
  const edges = useEdges();
  const handleChange = useChangeNodeData(id);
  const pairs = getPairs(spec.inputs, spec.outputs);

  const canAddInputs = spec.configuration.some((config) =>
    config.name === 'numInputs' && config.valueType === 'number'
  );
  const canAddOutputs = spec.configuration.some((config) =>
    config.name === 'numOutputs' && config.valueType === 'number'
  );

  let handleAddNodeSocket;
  if (canAddInputs) {
    handleAddNodeSocket = useAddNodeSocket(id, 'inputs');
  } else if (canAddOutputs) {
    handleAddNodeSocket = useAddNodeSocket(id, 'outputs');
  }

  return (
    <NodeContainer
      title={spec.label}
      category={spec.category}
      selected={selected}
    >
      {pairs.map(([input, output], ix) => (
        <div
          key={ix}
          className="flex flex-row justify-between gap-8 relative px-2"
          // className={styles.container}
        >
          {input && (
            <InputSocket
              {...input}
              specGenerator={specGenerator}
              value={data.values?.[input.name] ?? input.defaultValue}
              onChange={handleChange}
              connected={isHandleConnected(edges, id, input.name, 'target')}
            />
          )}
          {output && (
            <OutputSocket
              {...output}
              specGenerator={specGenerator}
              connected={isHandleConnected(edges, id, output.name, 'source')}
            />
          )}
        </div>
      ))}
      {handleAddNodeSocket && (<div className="flex flex-row self-center">
        <button style={{backgroundColor: "transparent"}} onClick={handleAddNodeSocket}>
          <FontAwesomeIcon icon={faCirclePlus} color="#ffffff" />
          {" Add socket"}
        </button>
      </div>)}
    </NodeContainer>
  );
};
