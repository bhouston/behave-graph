import { NodeCategory } from '../../Nodes/NodeCategory.js';
import { ValueJSON } from './GraphJSON.js';

export type InputSocketSpecJSON = {
  name: string;
  valueType: string;
  defaultValue?: ValueJSON;
};

export type OutputSocketSpecJSON = {
  name: string;
  valueType: string;
};

export type NodeSpecJSON = {
  type: string;
  category: NodeCategory;
  inputs: InputSocketSpecJSON[];
  outputs: OutputSocketSpecJSON[];
};
