import { NodeCategory } from '../../Nodes/NodeCategory';

export type InputSocketSpecJSON = {
  name: string;
  valueType: string,
  defaultValue?: string
}

export type OutputSocketSpecJSON = {
  name: string;
  valueType: string;
}

export type NodeSpecJSON = {
  type: string;
  category: NodeCategory;
  inputs: InputSocketSpecJSON[];
  outputs: OutputSocketSpecJSON[];
};
