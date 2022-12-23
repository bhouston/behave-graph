import { NodeCategory } from '../../Nodes/Registry/NodeCategory';
import { ValueJSON } from './GraphJSON';

export type InputSocketSpecJSON = {
  name: string;
  valueType: string;
  defaultValue?: ValueJSON;
};

export type OutputSocketSpecJSON = {
  name: string;
  valueType: string;
};
export type ConfigurationSpecJSON = {
  name: string;
  valueType: string;
};
export type NodeSpecJSON = {
  type: string;
  category: NodeCategory;
  label: string;
  configuration: ConfigurationSpecJSON;
  inputs: InputSocketSpecJSON[];
  outputs: OutputSocketSpecJSON[];
};
