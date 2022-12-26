import React from 'react';
import { NodeSpecJSON } from 'packages/core/src/Graphs/IO/NodeSpecJSON';
import NodeContainer from './NodeContainer';
import InputSocket from './InputSocket';
import OutputSocket from './OutputSocket';

type NodeProps = {
  spec: NodeSpecJSON;
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

const Node = ({ spec }: NodeProps) => {
  const pairs = getPairs(spec.inputs, spec.outputs);
  return (
    <NodeContainer title={spec.label} category={spec.category}>
      {pairs.map(([input, output], ix) => (
        <div
          key={ix}
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            gap: '0.5rem',
            padding: '0.5rem',
            position: 'relative',
          }}
        >
          {input && (
            <InputSocket
              {...input}
              value={input.defaultValue}
            />
          )}
          {output && (
            <OutputSocket
              {...output}
            />
          )}
        </div>
      ))}
    </NodeContainer>
  );
};

export default Node;