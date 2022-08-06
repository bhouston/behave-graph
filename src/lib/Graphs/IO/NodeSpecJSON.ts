import { NodeCategory } from '../../Nodes/NodeCategory';

export type InputSocketSpecJSON = {
  name: string;
  valueType: 'flow' |'string'|'number'|'boolean',
  defaultValue?: string | number | boolean
}

export type OutputSocketSpecJSON = {
  name: string;
  valueType: 'flow' |'string'|'number'|'boolean'
}

export type NodeSpecJSON = {
  type: string;
  category: NodeCategory;
  inputs: InputSocketSpecJSON[];
  outputs: OutputSocketSpecJSON[];
};
