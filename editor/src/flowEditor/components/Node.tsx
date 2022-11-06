import { NodeProps as FlowNodeProps, useEdges } from 'reactflow';
import { IScene, NodeSpecJSON } from '@behavior-graph/framework';
import InputSocket from './InputSocket';
import NodeContainer from './NodeContainer';
import OutputSocket from './OutputSocket';
import { useChangeNodeData } from '../hooks/useChangeNodeData';
import { isHandleConnected } from '../util/isHandleConnected';

type NodeProps = FlowNodeProps & {
  spec: NodeSpecJSON;
  allSpecs: NodeSpecJSON[];
} & Pick<IScene, 'getProperties'>;

const getTitle = (type: string) => {
  const tokens = type.split('/');
  const end = tokens[Math.min(tokens.length - 1, 1)]; // handles polymorphic node naming structure
  const spaces = end.replace(/([A-Z])/g, ' $1');
  return spaces.charAt(0).toUpperCase() + spaces.slice(1);
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

export const Node = ({ id, data, spec, selected, allSpecs, getProperties }: NodeProps) => {
  const edges = useEdges();
  const handleChange = useChangeNodeData(id);
  const pairs = getPairs(spec.inputs, spec.outputs);

  const shortJsonPath = spec.type.includes('scene/nodeClick');

  return (
    <NodeContainer title={getTitle(spec.type)} category={spec.category} selected={selected}>
      {pairs.map(([input, output], ix) => (
        <div key={ix} className="flex flex-row justify-between gap-8 relative px-2">
          {input && (
            <InputSocket
              {...input}
              allSpecs={allSpecs}
              value={data[input.name] ?? input.defaultValue}
              onChange={handleChange}
              connected={isHandleConnected(edges, id, input.name, 'target')}
              getProperties={getProperties}
              shortJsonPath={shortJsonPath}
            />
          )}
          {output && (
            <OutputSocket
              {...output}
              specJSON={allSpecs}
              connected={isHandleConnected(edges, id, output.name, 'source')}
            />
          )}
        </div>
      ))}
    </NodeContainer>
  );
};
